import { type SchemaTypeDefinition } from 'sanity';
import { orderRankField } from '@sanity/orderable-document-list';

const card = {
  name: 'card',
  type: 'document',
  title: 'Card',
  fields: [
    {
      required: true,
      name: 'title',
      type: 'text',
      title: 'Title',
    },
    {
      required: true,
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'url',
      type: 'string',
      title: 'Url',
    },
    {
      required: true,
      name: 'analyticsEventName',
      type: 'string',
      title: 'Analytics Event Name',
    },
    {
      required: true,
      name: 'newTab',
      type: 'boolean',
      title: 'Open in new tab?',
      default: false,
    },
    {
      ...orderRankField({ type: 'card' }),
    },
  ],
};

const moods = {
  name: 'moods',
  type: 'document',
  title: 'Moods',
  fields: [
    {
      required: true,
      name: 'moods',
      type: 'text',
      title: 'Moods',
    },
  ],
};

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [card, moods],
};
