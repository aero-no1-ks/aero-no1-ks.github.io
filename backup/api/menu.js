import _ from 'lodash'

const Menu =  [
  { header: 'Top-Level Analysis' },
  {
    title: 'Dashboard',
    icon: 'equalizer',
    to: '/'
  }, {
    title: 'Departure (Origin)',
    icon: 'flight_takeoff',
    to: '/production'
  }, {
    title: 'Arrival (Destination)',
    icon: 'flight_land',
    to: '/attraction'
  }, {
    title: 'Connection (Hub)',
    icon: 'call_split',
    to: '/connection'
  },
  { divider: true },
  { header: 'Data Science' },
  {
    title: 'Layout',
    icon: 'view_compact',
  }, {
    title: 'Forms',
    group: 'forms',
    component: 'forms',
    icon: 'edit',
    // items: [
    //   { name: 'basic', title: 'General', component: 'components/basic-forms' },
    //   { name: 'selects', title: 'Selects', badge: 'new', component: 'components/selects' },
    //   { name: 'selection-controls', title: 'Selection Controls', component: 'components/selection-controls' },
    //   { name: 'text-fields', title: 'Text Fields', component: 'components/text-fields' },
    //   { name: 'steppers', title: 'Steppers', component: 'components/steppers' },
    //   { name: 'editors', title: 'Editors', component: 'components/editors' },
    // ]
  },
  { divider: true },
  { header: 'Widgets' },
  {
    title: 'Map Projection',
    icon: 'layers',
    items: [
      { name: '2D',    title: '2D' },
      { name: '3D',    title: '3D' },
      { name: 'Globe', title: 'Globe' },
    ]
  },
  { divider: true },
]

// reorder menu
_.each(Menu, n => {
  if(!n.items) return
  n.items.sort((x, y) => {
    let textA = x.title.toUpperCase()
    let textB = y.title.toUpperCase()
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
  })
})

export default Menu
