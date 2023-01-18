import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

function RadarChart(){
    let chart = am4core.create("chartdiv", am4charts.RadarChart);

    chart.data = [{
        "category": "모델링",
        "point": "3",
        "average": "4",
    },{
        "category": "도면화",
        "point": "3",
        "average": "4",
    },{
        "category": "데이터 활용",
        "point": "3",
        "average": "4",
    },{
        "category": "협업/관리",
        "point": "3",
        "average": "4",
    },{
        "category": "인터페이스",
        "point": "3",
        "average": "4",
    }];

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