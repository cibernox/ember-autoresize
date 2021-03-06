import Ember from 'ember';
import snippets from '../snippets';

const { htmlSafe } = Ember.String;
const { get } = Ember;

export default Ember.Component.extend({
  title: '',
  classNames: ['window', 'editor'],
  text: Ember.computed('title', function () {
    return snippets[get(this, 'title')];
  }),

  formattedText: Ember.computed('text', function () {
    return get(this, 'text');
  }),

  lines: Ember.computed('formattedText', function () {
    let lines = get(this, 'formattedText').split('\n');
    let start = lines[0].length - lines[0].trim().length;
    return lines.map(function (code, i) {
      return {
        code: htmlSafe(code.slice(start) + '\n'),
        number: i + 1
      };
    });
  })
});
