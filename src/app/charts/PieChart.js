import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

function PieChart(data){
    let chart = am4core.create("pieChart", am4charts.PieChart);
    am4core.options.autoDispose = true;

    chart.data = [];

    let color = [am4core.color("#b4c7e7"), am4core.color("#bdd7ee"), am4core.color("#f8cbad"), am4core.color("#c5e0b4"), am4core.color("#ffe699")];

    for(let i=0; i<data.length; i++){
        chart.data.push({
            "category": data[i].category,
            "value": data[i].value,
            "color": color[i]
        });
    }

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