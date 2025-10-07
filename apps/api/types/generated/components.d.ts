import type { Schema, Attribute } from '@strapi/strapi';

export interface GeneralFooterLinks extends Schema.Component {
  collectionName: 'components_general_footer_links';
  info: {
    displayName: 'Footer Links';
    icon: 'apps';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    links: Attribute.Component<'general.link', true>;
  };
}

export interface GeneralLink extends Schema.Component {
  collectionName: 'components_general_links';
  info: {
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
  };
}

export interface GeneralSocialLink extends Schema.Component {
  collectionName: 'components_general_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'share';
    description: 'Social media platform link';
  };
  attributes: {
    platform: Attribute.Enumeration<
      [
        'twitter',
        'facebook',
        'instagram',
        'linkedin',
        'youtube',
        'github',
        'rss',
        'email'
      ]
    > &
      Attribute.Required;
    url: Attribute.String & Attribute.Required;
    label: Attribute.String;
  };
}

export interface ReviewGaspFactor extends Schema.Component {
  collectionName: 'components_review_gasp_factors';
  info: {
    displayName: 'Gasp Factor';
    icon: 'emotionHappy';
  };
  attributes: {
    scariness: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
        max: 100;
      }> &
      Attribute.DefaultTo<50>;
    suspense: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
        max: 100;
      }> &
      Attribute.DefaultTo<50>;
    bloodiness: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
        max: 100;
      }> &
      Attribute.DefaultTo<50>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'general.footer-links': GeneralFooterLinks;
      'general.link': GeneralLink;
      'general.social-link': GeneralSocialLink;
      'review.gasp-factor': ReviewGaspFactor;
    }
  }
}
