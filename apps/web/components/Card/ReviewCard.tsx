import styles from "./ReviewCard.module.scss";
import Link from "next/link";
import { APIReviewCardType } from "../../types/api";
import Image from "next/image";
import { GaspFactorCard } from "./GaspFactorCard";

export const ReviewCard: React.FC<{ review: APIReviewCardType }> = ({
  review,
}) => {
  return (
    <div className={styles["review-card-wrapper"]}>
      <Link href={`/reviews/${review.slug}`} title={`Read "${review.title}"`}>
        <div className={styles["review-thumb"]}>
          <Image
            src={`${process.env.NEXT_PUBLIC_CMS_URI}${review.featuredImage.formats.small.url}`}
            alt={
              review.featuredImage.alternativeText ||
              review.featuredImage.caption ||
              review.featuredImage.name
            }
            fill
          />
        </div>
        <div className={styles["review-content"]}>
          <h3>{review.title}</h3>
          <p>{review.description}</p>
        </div>
        <div className={styles["review-gasp-factor"]}>
          <GaspFactorCard
            bloodiness={review.gaspFactor.bloodiness}
            scariness={review.gaspFactor.scariness}
            suspense={review.gaspFactor.suspense}
          />
        </div>
      </Link>
    </div>
  );
};
