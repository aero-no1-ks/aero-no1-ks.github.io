import Vue     from 'vue'
import Vuex    from 'vuex'
import airport from '@/shared/airport'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    airport,
    oriArr: ['LAX', 'LAS', 'DEN', 'ORD', 'MCO', 'ATL'],
    desArr: ['LAX', 'LAS', 'DEN', 'ORD', 'MCO', 'ATL'],
    hubArr: ['ATL', 'CLT', 'DFW', 'ORD'],
    ori: 'SJU',
    des: 'PDX',
    slider: 2,
    areaColor: '#576B7A',
    airportName: _.map(airport, n => `${ n.code }: ${ n.city }`),
    color: ['#EC407A', '#C153D4', '#07C6B4', '#E6D715', '#43B90C', '#FFA726', '#007CDF', '#B3735D', '#BDBDBD'],
    effectTrail: { show: true, trailLength: 0.7, color: 'rgba(255, 255, 255, 0.5)', symbolSize: 4, constantSpeed: 30 },
    effectLines: { show: true, trailLength: 0, symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z', symbolSize: 10, constantSpeed: 30 },
    dataOri: _.orderBy(_.filter(datasetOri, isValidOD), ['tau'], ['desc']),
    dataDes: _.orderBy(_.filter(datasetDes, isValidOD), ['tau'], ['desc']),
    dataHub: _.filter(datasetHub, n => _.size(n.bndOt) && _.size(n.bndIn)).sort((a, b) => b.tau - a.tau),
  },
  getters: {
    oriFull({ ori, airportName }) {
      return airportName[getIx(ori)]
    },
    desFull({ des, airportName }) {
      return airportName[getIx(des)]
    },
    oriArrFull({ oriArr, airportName }) {
      return _.map(oriArr, n => airportName[getIx(n)])
    },
    desArrFull({ desArr, airportName }) {
      return _.map(desArr, n => airportName[getIx(n)])
    },
    hubArrFull({ hubArr, airportName }) {
      return _.map(hubArr, n => airportName[getIx(n)])
    },
    route(state) {
      return _.find(chartData, n => n.info.ori === state.ori && n.info.des === state.des)
    },
    routeData(state, getters) {
      if(!getters.route) return []
      return _.filter([...getters.route.data.major, ...getters.route.data.minor], n => n.ratio >= (state.slider / 100))
    },
    tau(state, getters) {
      return !getters.route ? 0 : getters.route.info.tau
    },
    airportNameOri({ dataOri }) {
      return _.map(dataOri, n => {
        const { code, city } = _.find(airport, o => o.code === n.ap)
        return `${ code }: ${ city }`
     })
    },
    airportNameDes({ dataDes }) {
      return _.map(dataDes, n => {
        const { code, city } = _.find(airport, o => o.code === n.ap)
        return `${ code }: ${ city }`
     })
    },
    airportNameHub({ dataHub }) {
      return _.map(dataHub, n => {
        const { code, city } = _.find(airport, o => o.code === n.ap)
        return `${ code }: ${ city }`
      })
    }
  },
  mutations: {
    setState(state, x) {
      return state[x[0]] = x[1]
    },
    flip(state) {
      return [state.ori, state.des] = [state.des, state.ori]
    }
  },
  actions: {
  },
})

function isValidOD() { return n => _.size(n.stopx) && _.size(n.stopy) }
function getIx(n) { return _.findIndex(airport, o => o.code === n) }
