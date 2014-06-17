$.form.init({
  table: {
    footerView: $.submit
  },
  fieldsets: [{
    section: {
      footerTitle: 'footerTitle of section set in JS',
      rows: [$.sectionRow]
    },
    legend: 'Legend of the 1st fieldset',
    fields: [{
        name: 'foo',
        label: 'Text type',
        type: 'text',
      }, {
        name: 'bar',
        labelid: 'i18n_label',
        type: 'text'
      },
      Ti.UI.createTableViewRow({
        title: 'Custom row via fields',
        backgroundColor: '#000',
        color: '#fff'
      }), {
        name: 'lorem',
        label: 'Textarea type',
        type: 'textarea'
      }
    ]
  }, {
    legendid: 'i18n_legend',
    fields: [{
      name: 'like',
      label: 'Switch type',
      type: 'switch',
    }, {
      name: 'email',
      label: 'E-mail format',
      type: 'text',
      format: 'email'
    }, {
      name: 'req',
      label: 'Required field',
      type: 'text',
      required: true
    }]
  }]
});

$.index.open();

function onSubmitClick(e) {

  if ($.form.isValid() === false) {
    alert('Correct the red fields');
  } else {
    alert(JSON.stringify($.form.getValues()));
  }
}