$(document).ready(function () {

  var $primary = '#002c59',
    $success = '#39DA8A',
    $danger = '#FF5B5C',
    $warning = '#FDAC41',
    $info = '#00CFAD',
    $label_color_light = '#E6EAEE';

  var themeColors = [$primary, $warning, $danger, $success, $info];

  // Line Chart
  // ----------------------------------
  var lineChartOptions = {
    chart: {
      height: 250,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    colors: themeColors,
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      name: "Desktops",
      data: [10, 25, 30, 35, 40, 50],
    }],

    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: [10,11,12,13,14,15],
    },
    yaxis: {
      tickAmount: 5,
    }
  }
  var lineChart = new ApexCharts(
    document.querySelector("#line-chart"),
    lineChartOptions
  );
  lineChart.render();

  // Line Area Chart
  // ----------------------------------
  var lineAreaOptions = {
    chart: {
      height: 350,
      type: 'area',
    },
    colors: themeColors,
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    legend: {
      offsetY: -10
    },
    xaxis: {
      type: 'datetime',
      categories: ["2019-09-18T00:00:00", "2019-09-18T01:00:00", "2019-09-18T02:00:00",
        "2019-09-18T03:00:00", "2019-09-18T04:00:00", "2019-09-18T05:00:00",
        "2019-09-18T06:00:00"
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    }
  }
  var lineAreaChart = new ApexCharts(
    document.querySelector("#line-area-chart"),
    lineAreaOptions
  );
  lineAreaChart.render();







  // Donut Chart
  // -----------------------------
  var donutChartOptions = {
    chart: {
      type: 'donut',
      height: 320
    },
    colors:  ['#002c59', '#ea6309', '#808080'],
    series: [44, 55, 41],
    labels: ['NCDMB', 'NIMASA', 'Other'],
    legend: {
      itemMargin: {
        horizontal: 2
      },
    },
    responsive: [{
      breakpoint: 576,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
  var donutChart = new ApexCharts(
    document.querySelector("#donut-chart"),
    donutChartOptions
  );

  donutChart.render();



});
