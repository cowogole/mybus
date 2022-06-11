import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo' 


const apolloClient = new ApolloClient({ 
  
  uri: process.env.VUE_APP_GraphQLHost,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  apolloProvider
}).$mount('#app')
