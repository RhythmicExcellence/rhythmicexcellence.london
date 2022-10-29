import CMS from 'netlify-cms-app';
// eslint-disable-next-line
import AdminCSS from '!css-loader!./admin.css';
// eslint-disable-next-line
import TeamCSS from '!css-loader!./team.css';

import { Team } from './TeamComponent';
import { TimetablePreview } from './TimetablePreview';

CMS.registerPreviewStyle(AdminCSS.toString(), { raw: true });
CMS.registerPreviewStyle(TeamCSS.toString(), { raw: true });

CMS.registerPreviewTemplate('team', Team);
CMS.registerPreviewTemplate('timetable', TimetablePreview);

CMS.registerEditorComponent({
  id: 'youtube',
  label: 'YouTube',
  fields: [{ name: 'id', label: 'YouTube Video ID', widget: 'string' }],
  pattern:
    /^<a class="youtubeVideo" href="https:\/\/youtu\.be\/(\S+)"><img alt="YouTube Video" src="http:\/\/img\.youtube\.com\/vi\/\S+" \/><\/a>$/,
  fromBlock(match) {
    return {
      id: match[1],
    };
  },
  toBlock(obj) {
    return `<a class="youtubeVideo" href="https://youtu.be/${obj.id}"><img alt="YouTube Video" src="http://img.youtube.com/vi/${obj.id}/maxresdefault.jpg" /></a>`;
  },
  toPreview(obj) {
    return `<a class="youtubeVideo" href="https://youtu.be/${obj.id}"><img alt="YouTube Video" src="http://img.youtube.com/vi/${obj.id}/maxresdefault.jpg" /></a>`;
  },
});

CMS.registerEditorComponent({
  id: 'linebreak',
  label: 'Line Break',
  pattern: /^---$/,
  toBlock() {
    return '---';
  },
  toPreview() {
    return '<hr />';
  },
});

CMS.registerEditorComponent({
  id: 'linkimage',
  label: 'Link Image',
  fields: [
    { name: 'id', label: 'Link Image', widget: 'image' },
    { name: 'link', label: 'Link', widget: 'string' },
    { name: 'description', label: 'Description', widget: 'string' },
  ],
  pattern: /^\[!\[(\S+)?\]\((\S+)\)]\((\S+)\)$/,
  fromBlock(match) {
    return {
      description: match[1],
      id: match[2],
      link: match[3],
    };
  },
  toBlock(obj) {
    return `[![${obj.description}](${obj.id})](${obj.link})`;
  },
  toPreview(obj) {
    return `<a href="${obj.link}"><img src="${obj.id}" alt="${obj.description}"/></a>`;
  },
});

CMS.registerEditorComponent({
  id: 'quote',
  label: 'Quote',
  fields: [
    { name: 'id', label: 'Quote', widget: 'string' },
    { name: 'author', label: 'Author', widget: 'string' },
  ],
  pattern: /^<blockquote class="otro-blockquote">(.+)<span>(.+)<\/span><\/blockquote>$/,
  fromBlock(match) {
    return {
      id: match[1],
      author: match[2],
    };
  },
  toBlock(obj) {
    return `<blockquote class="otro-blockquote">${obj.id}<span>${obj.author}</span></blockquote>`;
  },
  toPreview(obj) {
    return `<blockquote class="otro-blockquote">${obj.id}<span>${obj.author}</span></blockquote>`;
  },
});
