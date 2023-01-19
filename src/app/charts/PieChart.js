import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

function PieChart(){
    let chart = am4core.create("pieChart", am4charts.PieChart);
    am4core.options.autoDispose = true;

    chart.data = [{
        "category": "모델링",
        "value": "48.6",
        "color": am4core.color("#b4c7e7"),
    },{
        "category": "도면화",
        "value": "17.4",
        "color": am4core.color("#bdd7ee"),
    },{
        "category": "데이터 활용",
        "value": "10.8",
        "color": am4core.color("#f8cbad"),
    },{
        "category": "협업/관리",
        "value": "7.2",
        "color": am4core.color("#c5e0b4"),
    },{
        "category": "인터페이스",
        "value": "6",
        "color": am4core.color("#ffe699"),
    }];

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.labels.template.text = "{category}\n{value}min";
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color("black");
    pieSeries.labels.template.fontSize = 12
    pieSeries.labels.template.textAlign = 'middle'
    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;

    pieSeries.labels.template.adapter.add("radius", function(radius, target) {
        if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
          return 0;
        }
        return radius;
      });

    return chart;
}
export default PieChart