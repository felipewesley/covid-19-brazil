/** Request to API COVID-19 for Brazilian States */

const obj = fetch("https://covid19-brazil-api.now.sh/api/report/v1", {
    "method": "GET"
})
.then(response => response.json())
.catch(err => err);

Promise.resolve(obj).then(response => {
    // A Promise resolvida está disponível aqui
    
    // console.log(response)

    let e = Array(response.data); 

    for(let i in e){
        e[0][i].deaths = Number(e[0][i].deaths); 
    }
    console.log(e[0][0].deaths)

    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        
        let norte = []; 
            norte.push(e[0][3]); // Pará
            norte.push(e[0][7]); // Amazonas
            norte.push(e[0][21]); // Amapá
            norte.push(e[0][22]); // Rondônia
            norte.push(e[0][23]); // Roraima
            norte.push(e[0][24]); // Tocantins
            norte.push(e[0][25]); // Acre
        let nordeste = []; 
            nordeste.push(e[0][1]); // Ceará
            nordeste.push(e[0][4]); // Bahia
            nordeste.push(e[0][5]); // Maranhão
            nordeste.push(e[0][9]); // Pernanbuco
            nordeste.push(e[0][11]); // Paraíba
            nordeste.push(e[0][14]); // Alagoas
            nordeste.push(e[0][17]); // Rio Grande do Norte
            nordeste.push(e[0][16]); // Sergipe
            nordeste.push(e[0][19]); // Piauí
        let sul = []; 
            sul.push(e[0][12]); // Paraná
            sul.push(e[0][13]); // Santa Catarina
            sul.push(e[0][15]); // Rio Grande do Sul
        let sudeste = []; 
            sudeste.push(e[0][0]); // São Paulo
            sudeste.push(e[0][2]); // Rio de Janeiro
            sudeste.push(e[0][6]); // Minas Gerais
            sudeste.push(e[0][10]); // Espírito Santo
        let centro_oeste = []; 
            centro_oeste.push(e[0][18]); // Goiás
            centro_oeste.push(e[0][20]); // Mato Grosso
            centro_oeste.push(e[0][26]); // Mato Grosso do Sul
        let dist_federal = []; 
            dist_federal.push(e[0][8]) // Distrito Federal

        // Add data
        chart.data = [ {
            "zone": "Norte",
            "acre": e[0][25].deaths,
            "amazonas": e[0][7].deaths,
            "amapa": e[0][21].deaths,
            "para": e[0][3].deaths,
            "rondonia": e[0][22].deaths,
            "roraima": e[0][23].deaths,
            "tocantins": e[0][24].deaths
          }, {
            "zone": "Nordeste",
            "ceara": e[0][1].deaths,
            "bahia": e[0][4].deaths,
            "maranhao": e[0][5].deaths,
            "pernambuco": e[0][9].deaths,
            "paraiba": e[0][11].deaths,
            "alagoas": e[0][14].deaths, 
            "riograndenorte": e[0][17].deaths,
            "sergipe": e[0][16].deaths,
            "piaui": e[0][19].deaths
          }, {
            "zone": "Sul",
            "parana": e[0][12].deaths,
            "santacatarina": e[0][13].deaths,
            "riograndesul": e[0][15].deaths
          }, {
            "zone": "Sudeste",
            "saopaulo": e[0][0].deaths,
            "riodejaneiro": e[0][2].deaths,
            "minasgerais": e[0][6].deaths,
            "espiritosanto": e[0][10].deaths
          }, {
            "zone": "Centro-Oeste",
            "goias": e[0][18].deaths,
            "matogrosso": e[0][20].deaths,
            "matogrossosul": e[0][26].deaths
          }, {
            "zone": "Distrito Federal",
            "distfed": e[0][8].deaths
          } ];

        /*
        // Add data
        chart.data = [ {
          "year": "2003",
          "europe": 2.5,
          "namerica": 2.5,
          "asia": 2.1,
          "lamerica": 1.2,
          "meast": 0.2,
          "africa": 0.1
        }, {
          "year": "2004",
          "europe": 2.6,
          "namerica": 2.7,
          "asia": 2.2,
          "lamerica": 1.3,
          "meast": 0.3,
          "africa": 0.1
        }, {
          "year": "2005",
          "europe": 2.8,
          "namerica": 2.9,
          "asia": 2.4,
          "lamerica": 1.4,
          "meast": 0.3,
          "africa": 0.1
        } ];
        */
        
        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "zone";
        categoryAxis.title.text = "Regiões do Brasil";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;
        
        var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Quantidade de mortes";
        
        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "zone";
          series.name = name;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(95);
        }
        
        createSeries("saopaulo", "São Paulo", true);
        createSeries("ceara", "Ceará", true);
        createSeries("para", "Pará", true);
        createSeries("riodejaneiro", "Rio de Janeiro", true);
        createSeries("bahia", "Bahia", true);
        createSeries("maranhao", "Maranhão", true);
        createSeries("minasgerais", "Minas Gerais", true);
        createSeries("amazonas", "Amazonas", true);
        createSeries("distfed", "Distrito Federal", true);
        createSeries("pernambuco", "Pernambuco", true);
        createSeries("espiritosanto", "Espírito Santo", true);
        createSeries("paraiba", "Paraíba", true);
        createSeries("parana", "Paraná", true);
        createSeries("santacatarina", "Santa Catarina", true);
        createSeries("alagoas", "Alagoas", true);
        createSeries("riograndesul", "Rio Grande do Sul", true);
        createSeries("riograndenorte", "Rio Grande do Norte", true);
        createSeries("sergipe", "Sergipe", true);
        createSeries("goias", "Goiás", true);
        createSeries("piaui", "Piauí", true);
        createSeries("amapa", "Amapá", true);
        createSeries("matogrosso", "Mato Grosso", true);
        createSeries("rondonia", "Rondônia", true);
        createSeries("roraima", "Roraima", true);
        createSeries("tocantins", "Tocantins", true);
        createSeries("acre", "Acre", true);
        createSeries("matogrossosul", "Mato Grosso do Sul", true);
        
        if(window.innerWidth >= 750){
            // Add legend
            chart.legend = new am4charts.Legend();
        }
        
    }); // end am4core.ready()

}); 
