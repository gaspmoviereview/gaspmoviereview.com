import { faker } from "@faker-js/faker";
import { Strapi } from "@strapi/strapi";
import { existsSync, rmSync, statSync, writeFileSync } from "fs";
import { mkdir, readdir, rm } from "fs/promises";
import path from "path";

const seedPath = path.resolve(process.cwd(), "./.seed");

export const uploadFile = async (strapi: Strapi, { data, file }: any) => {
  const { refId, ref, field } = data;
  const { name, path, type } = file;

  const fileStat = statSync(path);

  const [uploadedFile] = await strapi.plugins.upload.services.upload.upload({
    data: {
      refId,
      ref,
      field,
    },
    files: {
      path,
      name,
      type,
      size: fileStat.size,
    },
  });

  return uploadedFile;
};

const makeImage = async (
  ref: string,
  field: string,
  imageType = "urlPicsumPhotos"
) => {
  const imageRequest = await fetch(faker.image[imageType]());
  const imageId = imageRequest.headers.get("picsum-id");

  writeFileSync(
    `${seedPath}/${imageId}.jpg`,
    Buffer.from(await imageRequest.arrayBuffer())
  );

  return await uploadFile(strapi, {
    data: {
      refId: Date.now().toString(),
      ref,
      field,
    },
    file: {
      path: `${seedPath}/${imageId}.jpg`,
      name: `${imageId}.jpg`,
      type: "image/jpg",
    },
  });
};

const makeReviewObjects = (
  amount: number,
  authorId: string | number,
  genreIds: (number | string)[]
) =>
  Promise.all(
    Array.from(Array(amount).keys()).map(async (id) => {
      const imgData = await makeImage("api::review.review", "featuredImage");

      return {
        id,
        title: faker.music.songName(),
        description: faker.lorem.lines(1),
        slug: faker.lorem.slug(),
        content: [
          {
            type: "heading",
            level: 2,
            children: [{ text: faker.lorem.lines(1), type: "text" }],
          } as any,
          {
            type: "paragraph",
            children: [{ text: faker.lorem.paragraph(), type: "text" }],
          },
          {
            type: "paragraph",
            children: [{ text: faker.lorem.paragraph(), type: "text" }],
          },
        ],
        triggers: `${faker.lorem
          .words({ min: 2, max: 12 })
          .replace(/ /, ", ")}`,
        featuredImage: imgData.id,
        gaspFactor: {
          suspense: faker.number.int({ min: 1, max: 100 }),
          scariness: faker.number.int({ min: 1, max: 100 }),
          bloodiness: faker.number.int({ min: 1, max: 100 }),
        },
        author: authorId,
        genres: genreIds,
        publishedAt: new Date(),
        relatedReviews: [],
      };
    })
  );

const makeAuthorObjects = (amount: number) =>
  Promise.all(
    Array.from(Array(amount).keys()).map(async (id) => {
      const imgData = await makeImage(
        "api::author.author",
        "featuredImage",
        "avatar"
      );
      return {
        featuredImage: imgData.id,
        name: faker.person.fullName(),
        tagline: faker.person.bio(),
        slug: faker.lorem.slug(),
        publishedAt: new Date(),
      };
    })
  );

const makeGenreObjects = (amount: number) =>
  Array.from(Array(amount).keys()).map((id) => {
    return {
      slug: faker.lorem.slug(),
      title: faker.music.genre(),
      publishedAt: new Date(),
    };
  });

const seedSiteInfo = async (strapi: Strapi) => {
  return await strapi.entityService.create("api::site-info.site-info", {
    data: {
      description: faker.company.catchPhraseDescriptor(),
      email: faker.internet.email(),
      socialShareImage: (
        await makeImage(
          "api::site-info.site-info",
          "socialShareImage",
          "urlLoremFlickr"
        )
      ).id,
      logoDark: (
        await makeImage(
          "api::site-info.site-info",
          "logoDark",
          "urlLoremFlickr"
        )
      ).id,
      logoLight: (
        await makeImage(
          "api::site-info.site-info",
          "logoLight",
          "urlLoremFlickr"
        )
      ).id,
      name: faker.company.name(),
      tagline: faker.company.buzzPhrase(),
      footerLinkColumns: [
        {
          title: faker.lorem.words(2),
          links: [
            {
              label: faker.lorem.words(3),
              title: faker.lorem.words(3),
              url: faker.internet.url(),
            },
            {
              label: faker.lorem.words(3),
              title: faker.lorem.words(3),
              url: faker.internet.url(),
            },
            {
              label: faker.lorem.words(3),
              title: faker.lorem.words(3),
              url: faker.internet.url(),
            },
          ],
        },
        {
          title: faker.lorem.words(2),
          links: [
            {
              label: faker.lorem.words(3),
              title: faker.lorem.words(3),
              url: faker.internet.url(),
            },
            {
              label: faker.lorem.words(3),
              title: faker.lorem.words(3),
              url: faker.internet.url(),
            },
            {
              label: faker.lorem.words(3),
              title: faker.lorem.words(3),
              url: faker.internet.url(),
            },
          ],
        },
      ],
      navLinks: [
        {
          label: faker.lorem.words(3),
          title: faker.lorem.words(3),
          url: faker.internet.url(),
        },
        {
          label: faker.lorem.words(3),
          title: faker.lorem.words(3),
          url: faker.internet.url(),
        },
        {
          label: faker.lorem.words(3),
          title: faker.lorem.words(3),
          url: faker.internet.url(),
        },
      ],
      publishedAt: Date.now().toString(),
    },
    populate: [
      "logoDark",
      "logoLight",
      "navLinks",
      "footerLinkColumns",
      "socialShareImage",
    ],
  });
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    if (process.env.SEED === "TRUE") {
      strapi.log.info(">> Beginning to add seed data");

      if (!existsSync(seedPath)) {
        await mkdir(seedPath);
      }
      // Empty the DB
      await strapi.db.query("api::author.author").deleteMany();
      await strapi.db.query("api::review.review").deleteMany();
      await strapi.db.query("api::genre.genre").deleteMany();
      await strapi.db.query("api::page.page").deleteMany();
      await strapi.db.query("api::site-info.site-info").deleteMany();
      await strapi.db.query("plugin::upload.file").deleteMany();

      const authorObjects = await makeAuthorObjects(2);
      const authorPromises = authorObjects.map((author) =>
        strapi.entityService.create("api::author.author", {
          data: author,
          populate: ["featuredImage"],
        })
      );
      const authorRecords = await Promise.all(authorPromises);

      const genreObjects = makeGenreObjects(5);
      const genrePromises = genreObjects.map((genre) =>
        strapi.entityService.create("api::genre.genre", {
          data: genre,
        })
      );
      const genreRecords = await Promise.all(genrePromises);

      // Make some review objects
      const reviewObjects = await makeReviewObjects(
        40,
        authorRecords[0].id,
        genreRecords.map((genre) => genre.id)
      );
      const reviewPromises = reviewObjects.map((review) =>
        strapi.entityService.create("api::review.review", {
          data: review,
          populate: ["featuredImage", "gaspFactor", "author", "genres"],
        })
      );
      await Promise.all(reviewPromises);

      await strapi.entityService.create("api::page.page", {
        data: {
          content: [
            {
              type: "heading",
              level: 2,
              children: [{ text: faker.lorem.lines(1), type: "text" }],
            } as any,
            {
              type: "paragraph",
              children: [{ text: faker.lorem.paragraph(), type: "text" }],
            },
            {
              type: "paragraph",
              children: [{ text: faker.lorem.paragraph(), type: "text" }],
            },
          ],
          description: faker.lorem.sentence(),
          isContact: false,
          featuredImage: await makeImage("api::page.page", "featuredImage"),
          slug: "home",
          title: "home",
          publishedAt: new Date(),
        },
      });

      await seedSiteInfo(strapi);

      strapi.log.info(">> Finished adding seed data");
      strapi.log.info(">> Wiping seed images");

      const files = await readdir(seedPath, {
        withFileTypes: true,
      });

      files.forEach(async (file) => {
        await rm(`${file.path}/${file.name}`);
      });
    }
  },
};
