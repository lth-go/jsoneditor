// create editor 1
const editor1 = new JSONEditor(document.getElementById('jsoneditor1'), {
  mode: 'code',
  history: true,
  onChangeText: function (jsonString) {
    editor2.updateText(jsonString)
  },
})

// create editor 2
const editor2 = new JSONEditor(document.getElementById('jsoneditor2'), {
  mode: 'tree',
  // modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
  onCreateMenu: function (items, node) {

    const path = node.path

    function parseJson() {
      let updateNode = editor2.node.findNodeByPath(path)

      let value = updateNode.getValue()

      if (typeof (value) == 'string') {
        updateNode.setValue(JSON.parse(value))

        // 展开所有字段
        updateNode.expand()
      }
    }

    // Create a new menu item. For our example, we only want to do this
    // if there is a path (in the case of appendnodes (for new objects)
    // path is null until a node is created)
    if (path) {
      // Each item in the items array represents a menu item,
      // and requires the following details :

      items.push({
        text: 'Parse', // the text for the menu item
        title: 'Parse', // the HTML title attribute
        className: 'example-class', // the css class name(s) for the menu item
        click: parseJson // the function to call when the menu item is clicked
      })
    }


    // Now we will iterate through the menu items, which includes the items
    // created by jsoneditor, and the new item we added above. In this
    // example we will just alter the className property for the items, but
    // you can alter any property (e.g. the click callback, text property etc.)
    // for any item, or even delete the whole menu item.
    items.forEach(function (item, index, items) {
      if ("submenu" in item) {
        // if the item has a submenu property, it is a submenu heading
        // and contains another array of menu items. Let's colour
        // that yellow...
        items[index].className += ' submenu-highlight'
      } else {
        // if it's not a submenu heading, let's make it colorful
        items[index].className += ' rainbow'
      }
    })

    // note that the above loop isn't recursive, so it only alters the classes
    // on the top-level menu items. To also process menu items in submenus
    // you should iterate through any "submenu" arrays of items if the item has one.

    // next, just for fun, let's remove any menu separators (again just at the
    // top level menu). A menu separator is an item with a type : 'separator'
    // property
    items = items.filter(function (item) {
      return item.type !== 'separator'
    })

    // finally we need to return the items array. If we don't, the menu
    // will be empty.
    return items
  }
})

// set initial data in both editors
const json = {}
editor1.set(json)
editor2.set(json)
