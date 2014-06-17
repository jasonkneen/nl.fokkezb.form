# Fieldsets
Fieldsets group fields `Ti.UI.TableViewRow` in a `Ti.UI.TableViewSection`.

## All forms require a fieldset..
Fields are always wrapped in a fieldset. Fieldsets create a [`Ti.UI.TableViewSection`](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.TableViewSection) holding one or more fields, each creating a [`Ti.UI.TableViewRow`](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.TableViewRow). And like all [TableViews](http://docs.appcelerator.com/titanium/latest/#!/guide/TableViews) require at least one section, so do our forms.

## But it can create one for you
If you don't have a `fieldsets` property in the root of your config, but you do have a `fields` property, then the widget will wrap it in a fieldset for you so that:

	{
		legend: 'My form',
		fields: [{
			name: 'name',
			label: 'Your name',
			type: 'text'
		}],
		values: {
			name: 'Jeff'
		}
	}
	
Equals:

	{
		fieldsets: [{
			legend: 'My form',
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text'
			}]
		}],
		values: {
			name: 'Jeff'
		}
	}
	
## Setting a legend
The `legend` property sets the [`headerTitle`](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.TableViewSection-property-headerTitle) property of the `Ti.UI.TableViewSection`.

	{
		fieldsets: [{
			legend: 'My form',
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text'
			}]
		}]
	}

You can also use `legendid` in which case it will be processed by `L()`.
	
## Customize
You can further customize the `Ti.UI.TableViewSection` in 2 ways:

### Apply properties
Set any `Ti.UI.TableViewSection` properties via the fieldset's `section` property:

	{
		fieldsets: [{
			section: {
				headerView: Ti.UI.createView( .. ),
				footerTitle: 'Some text after the fields',
				classes: ['customClass'], // section is created by $.UI.create()
				rows: [
					Ti.UI.createTableViewRow( .. ) // field rows will be appended
				]
			},
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text'
			}]
		}]
	}
	
### Override style
The `Ti.UI.TableViewSection` is created using a `.section` class, unless you have set it to something else. As of Alloy 1.4.0 you can use this class to [override the style using a theme](https://jira.appcelerator.org/browse/ALOY-378) for the widget's `widget.tss` file.