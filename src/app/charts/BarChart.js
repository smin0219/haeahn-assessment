import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

function BarChart(){
    let chart = am4core.create("barChart", am4charts.XYChart);
    am4core.options.autoDispose = true;

    chart.data = [{
        "category": "평균",
        "value": "62min",
        "color": "#b4c7e7"
    },{
        "category": "나",
        "value": "73min",
        "color": "#5b9bd5"
    }];

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 90;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "value";
    series.dataFields.categoryY = "category";
    series.columns.template.propertyFields.fill = "color";
    series.columns.template.propertyFields.stroke = "color";

    var valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{value}";
    valueLabel.label.fontSize = 15;

    return chart;
}
export default BarChart