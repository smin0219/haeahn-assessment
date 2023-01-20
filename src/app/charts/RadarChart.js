import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

function RadarChart(data){
    let chart = am4core.create("radarChart", am4charts.RadarChart);
    am4core.options.autoDispose = true;

    chart.data = [];

    for(let i=0; i<data.length; i++){
        chart.data.push({
            "category": data[i].category,
            "point": data[i].point,
            "average": data[i].average
        });
    }

    chart.dataSource.url = "chart_data.json";

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
    valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

    let pointSeries = chart.series.push(new am4charts.RadarSeries());
    pointSeries.dataFields.valueY = "point";
    pointSeries.dataFields.categoryX = "category";
    pointSeries.name = "Point";
    pointSeries.strokeWidth = 3;

    let averageSeries = chart.series.push(new am4charts.RadarSeries());
    averageSeries.dataFields.valueY = "average";
    averageSeries.dataFields.categoryX = "category";
    averageSeries.name = "Average";
    averageSeries.strokeWidth = 3;

    return chart;
}
export default RadarChart;