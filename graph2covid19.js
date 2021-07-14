/** Request to API COVID-19 for Brazilian States */

const dataSourceUrl = "https://covid19-brazil-api.now.sh/api/report/v1";

const states = {
  // Norte
  Para: 15,
  Amazonas: 13,
  Amapa: 16,
  Rondonia: 11,
  Roraima: 14,
  Tocantins: 17,
  Acre: 12,

  // Nordeste
  Ceara: 23,
  Bahia: 29,
  Maranhao: 21,
  Pernambuco: 26,
  Paraiba: 25,
  Alagoas: 27,
  RioGrandeDoNorte: 24,
  Sergipe: 28,
  Piaui: 22,

  // Sul
  Parana: 41,
  SantaCatarina: 42,
  RioGrandeDoSul: 43,

  // Sudeste
  SaoPaulo: 35,
  RioDeJaneiro: 33,
  MinasGerais: 31,
  EspiritoSanto: 32,

  // Centro-Oeste
  Goias: 52,
  MatoGrosso: 51,
  MatoGrossoDoSul: 50,

  // Distrito Federal
  DistritoFederal: 53
};

const norte = {
  acre: 0,
  amazonas: 0,
  amapa: 0,
  para: 0,
  rondonia: 0,
  roraima: 0,
  tocantins: 0
};
    
const nordeste = {
  ceara: 0,
  bahia: 0,
  maranhao: 0,
  pernambuco: 0,
  paraiba: 0,
  alagoas: 0, 
  riograndenorte: 0,
  sergipe: 0,
  piaui: 0
};

const sul = {
  parana: 0,
  santacatarina: 0,
  riograndesul: 0
};

const sudeste = {
  saopaulo: 0,
  riodejaneiro: 0,
  minasgerais: 0,
  espiritosanto: 0
};

const centro_oeste = {
  goias: 0,
  matogrosso: 0,
  matogrossosul: 0
};

const dist_federal = {
  distfed: 0
};

const obj = fetch(dataSourceUrl, {"method": "GET"})
  .then(response => response.json())
  .catch(err => console.error(err));

Promise.resolve(obj).then(response => {

    const data = Array(response.data)[0];
    console.log(data)
    data.forEach(element => {

      const deaths = element.deaths;

      switch (element.uid) {

          // Regiao Norte
          case states.Para:
            norte.para = deaths;
            break;
          case states.Amazonas:
            norte.amazonas = deaths;
            break;
          case states.Amapa:
            norte.amapa = deaths;
            break;
          case states.Rondonia:
            norte.rondonia = deaths;
            break;
          case states.Roraima:
            norte.roraima = deaths;
            break;
          case states.Tocantins:
            norte.tocantins = deaths;
            break;
          case states.Acre:
            norte.acre = deaths;
            break;

          // Regiao Nordeste
          case states.Ceara:
            nordeste.ceara = deaths;
            break;
          case states.Bahia:
            nordeste.bahia = deaths;
            break;
          case states.Maranhao:
            nordeste.maranhao = deaths;
            break;
          case states.Pernambuco:
            nordeste.pernambuco = deaths;
            break;
          case states.Paraiba:
            nordeste.paraiba = deaths;
            break;
          case states.Alagoas:
            nordeste.alagoas = deaths;
            break;
          case states.RioGrandeDoNorte:
            nordeste.riograndenorte = deaths;
            break;
          case states.Sergipe:
            nordeste.sergipe = deaths;
            break;
          case states.Piaui:
            nordeste.piaui = deaths;
            break;
              
          // Regiao Sul
          case states.Parana:
            sul.parana = deaths;
            break;
          case states.SantaCatarina:
            sul.santacatarina = deaths;
            break;
          case states.RioGrandeDoSul:
            sul.riograndesul = deaths;
            break;

          // Regiao Sudeste
          case states.SaoPaulo:
            sudeste.saopaulo = deaths;
            break;
          case states.RioDeJaneiro:
            sudeste.riodejaneiro = deaths;
            break;
          case states.MinasGerais:
            sudeste.minasgerais = deaths;
            break;
          case states.EspiritoSanto:
            sudeste.espiritosanto = deaths;
            break;
          
          // Regiao Centro-Oeste
          case states.Goias:
            centro_oeste.goias = deaths;
            break;
          case states.MatoGrosso:
            centro_oeste.matogrosso = deaths;
            break;
          case states.MatoGrossoDoSul:
            centro_oeste.matogrossosul = deaths;
            break;
          
          // Distrito Federal
          case states.DistritoFederal:
              dist_federal.distfed = deaths;
              break;
      }
    });
    
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        chart.data = [
          {...norte, zone: "Norte"}, 
          {...nordeste, zone: "Nordeste"},
          {...sul, zone: "Sul"},
          {...sudeste, zone: "Sudeste"},
          {...centro_oeste, zone: "Centro-Oeste"},
          {...dist_federal, zone: "Distrito Federal"}
        ];

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
