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
      }, {
        name: 'color',
        label: 'Color type (iPad)',
        type: 'color',
        value: '#F00'
      }, {
        name: 'date',
        label: 'Picker type (date)',
        type: 'picker',
        picker: {
          type: Ti.UI.PICKER_TYPE_DATE,
          format: 'DD-MM-YYYY'
        },
        value: '04-07-2014'
      }, {
        name: 'time',
        label: 'Picker type (time)',
        type: 'picker',
        picker: {
          type: Ti.UI.PICKER_TYPE_TIME,
          format: 'HH:mm'
        },
        value: '16:30'
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
      format: 'email',
      row: {
        layout: 'vertical'
      }
    }, {
      name: 'sdk',
      label: 'Select type (arr)',
      type: 'select',
      options: ['3.1.3.GA', '3.2.3.GA', '3.3.0.RC'],
      value: 2
    }, {
      name: 'cities',
      label: 'Select type (obj)',
      type: 'select',
      options: {
        'ams': 'Amsterdam',
        'nyc': 'New York City',
        'lnd': 'London'
      },
      value: 'nyc'
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