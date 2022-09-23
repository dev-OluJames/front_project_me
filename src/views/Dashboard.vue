<template>
  <div>

    <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header" style="background-image: url(store/img/bg-img/24.jpg);">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Total Offres"
                      type="gradient-red"
                      :sub-title="dashboard.total_offre+''"
                      icon="ni ni-active-40"
                      class="mb-4">

            <template slot="footer">
              <span :class="offre_progress > 20 ? 'text-success mr-2' : 'text-danger mr-2'">{{ offre_progress }}%</span>
              <span class="text-nowrap">Depuis le mois Passé</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total Demandes"
                      type="gradient-orange"
                      :sub-title="dashboard.total_demande+''"
                      icon="ni ni-chart-pie-35"
                      class="mb-4">

            <template slot="footer">
              <span :class="demande_progress > 20 ? 'text-success mr-2' : 'text-danger mr-2'">{{ demande_progress }}%</span>
              <span class="text-nowrap">Depuis le mois passé</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Utilisateurs"
                      type="gradient-green"
                      :sub-title="utilisateur_total+''"
                      icon="ni ni-money-coins"
                      class="mb-4">

            <template slot="footer">
<!--              <span class="text-danger mr-2">5.72%</span>-->
              <span class="text-nowrap" v-for="(user,index) in dashboard.nbre_user_par_type_user" :key="index">
                {{ user.type_user[0].toUpperCase() + user.type_user.slice(1) }} : {{user.nbre_user}} |
              </span>
            </template>
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Utilisateurs/Packs"
                      type="gradient-info"
                      :sub-title="'0'"
                      icon="ni ni-chart-bar-32"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">0%</span>
              <span class="text-nowrap">En cours</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="8" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Offres / Demandes</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                       class="mr-2 mr-md-0"
                       :active="bigLineChart.activeIndex === 0"
                       link-classes="py-2 px-3"
                       @click.prevent="initBigChart(0)">
                      <span class="d-none d-md-block">Offres</span>
                      <span class="d-md-none">O</span>
                  </b-nav-item>
                  <b-nav-item
                    link-classes="py-2 px-3"
                    :active="bigLineChart.activeIndex === 1"
                    @click.prevent="initBigChart(1)"
                  >
                    <span class="d-none d-md-block">Demandes</span>
                    <span class="d-md-none">D</span>
                  </b-nav-item>
                </b-nav>
              </b-col>
            </b-row>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </card>
        </b-col>

        <b-col xl="4" class="mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </b-col>
            </b-row>

            <bar-chart
              :height="350"
              ref="barChart"
              :chart-data="redBarChart.chartData"
            >
            </bar-chart>
          </card>
        </b-col>
      </b-row>
      <!-- End charts-->

      <!--Tables-->
      <!-- b-row class="mt-5">
        <b-col xl="8" class="mb-5 mb-xl-0">
          <page-visits-table></page-visits-table>
        </b-col>
        <b-col xl="4" class="mb-5 mb-xl-0">
          <social-traffic-table></social-traffic-table>
        </b-col>
      </b-row -->
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
// Charts
import * as chartConfigs from '@/components/Charts/config';
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';

// Components
import BaseProgress from '@/components/BaseProgress';
import StatsCard from '@/components/Cards/StatsCard';

// Tables
import SocialTrafficTable from './Dashboard/SocialTrafficTable';
import PageVisitsTable from './Dashboard/PageVisitsTable';
import Resource from "../api/resource";

const dasshBoardResource = new Resource('dashboard');

  export default {
    components: {
      LineChart,
      BarChart,
      BaseProgress,
      StatsCard,
      PageVisitsTable,
      SocialTrafficTable
    },
    data() {
      return {
        months: [
          "janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"
        ],
        bigLineChart: {
          allData: [],
          activeIndex: 0,
          chartData: {
            datasets: [
              {
                label: 'Total',
                data: [],
              }
            ],
            labels: [
              "jan","fev","mars","avr","mai","juin","juil","aout","sept","oct","nov","dec"
            ],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        dashboard: {},
        offre_progress: null,
        demande_progress: null,
        utilisateur_total: null,
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          },
          extraOptions: chartConfigs.blueChartOptions
        }
      };
    },
    created() {
      this.getDashBoard();
    },
    methods: {
      initBigChart(index) {
        this.bigLineChart.chartData = {
          datasets: [
            {
              label: 'Total',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: [
            "jan","fev","mars","avr","mai","juin","juil","aout","sept","oct","nov","dec"
          ],
        };
        this.bigLineChart.activeIndex = index;
      },
      getDashBoard(){
        dasshBoardResource.list()
        .then((response) => {

          this.dashboard = response.data;
          const d = new Date();
          const m = d.getMonth();
          const month = this.months[m];
          const prev_month = this.months[m-1];
          const m_data = this.dashboard.agiots[month];
          const last_m = this.dashboard.agiots[prev_month];
          console.log('THIS MONTH', m_data);

          this.offre_progress = Math.round((m_data.total_offre / (this.dashboard.total_offre - m_data.total_offre))*100);
          this.demande_progress = Math.round((m_data.total_demande / (this.dashboard.total_demande - m_data.total_demande))*100);
          let utilisateur_total = 0;
          response.data.nbre_user_par_type_user.forEach((user) => {
            utilisateur_total = utilisateur_total + user.nbre_user;
          })
          this.utilisateur_total = utilisateur_total;
          console.log('PROGRESS ', this.offre_progress);

          let offre_values = [];
          let demande_values = [];
          this.months.forEach((month)=> {
            offre_values.push(this.dashboard.agiots[month].total_offre);
            demande_values.push(this.dashboard.agiots[month].total_demande);
          });
          console.log('VALUES ', offre_values, demande_values);
          this.bigLineChart.allData.push(offre_values);
          this.bigLineChart.allData.push(demande_values);
          this.initBigChart(0);
        })
      },
    },
    mounted() {
      this.initBigChart(0);
    },
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
</style>
