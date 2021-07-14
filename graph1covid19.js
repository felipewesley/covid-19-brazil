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
    SaoPaulo: 20,
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

const obj = fetch(dataSourceUrl, {"method": "GET"})
    .then(response => response.json())
    .catch(err => console.error(err));

Promise.resolve(obj).then(response => {
    
    const data = Array(response.data)[0];

    let norte = []; 
    let nordeste = []; 
    let sul = []; 
    let sudeste = []; 
    let centro_oeste = []; 
    let dist_federal = []; 

    data.forEach(element => {

        switch (element.uid) {

            case states.Para:
            case states.Amazonas:
            case states.Amapa:
            case states.Rondonia:
            case states.Roraima:
            case states.Tocantins:
            case states.Acre:
                norte.push(element);
                break;
            case states.Ceara:
            case states.Bahia:
            case states.Maranhao:
            case states.Pernambuco:
            case states.Paraiba:
            case states.Alagoas:
            case states.RioGrandeDoNorte:
            case states.Sergipe:
            case states.Piaui:
                nordeste.push(element);
                break;
            case states.Parana:
            case states.SantaCatarina:
            case states.RioGrandeDoSul:
                sul.push(element);
                break;
            case states.SaoPaulo:
            case states.RioDeJaneiro:
            case states.MinasGerais:
            case states.EspiritoSanto:
                sudeste.push(element);
                break;
            case states.Goias:
            case states.MatoGrosso:
            case states.MatoGrossoDoSul:
                centro_oeste.push(element);
                break;
            case states.DistritoFederal:
                dist_federal.push(element);
                break;
        }
    });

    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
        chart.legend = new am4charts.Legend();
        
        var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

        let regiao_norte = {
            name: 'Norte', 
            children: []
        }
        norte.forEach(e => {
            regiao_norte.children.push({
                name: e.state, 
                children: [
                    {
                        name: 'Casos', 
                        value: Number(e.cases)
                    }, {
                        name: 'Mortes', 
                        value: Number(e.deaths)
                    }, {
                        name: 'Recuperados', 
                        value: Number(e.refuses)
                    }
                ]
            });
        }); 

        let regiao_nordeste = {
            name: 'Nordeste', 
            children: []
        }
        nordeste.forEach(e => {
            regiao_nordeste.children.push({
                name: e.state, 
                children: [
                    {
                        name: 'Casos', 
                        value: Number(e.cases)
                    }, {
                        name: 'Mortes', 
                        value: Number(e.deaths)
                    }, {
                        name: 'Recuperados', 
                        value: Number(e.refuses)
                    }
                ]
            });
        });

        let regiao_sul = {
            name: 'Sul', 
            children: []
        }
        sul.forEach(e => {
            regiao_sul.children.push({
                name: e.state, 
                children: [
                    {
                        name: 'Casos', 
                        value: Number(e.cases)
                    }, {
                        name: 'Mortes', 
                        value: Number(e.deaths)
                    }, {
                        name: 'Recuperados', 
                        value: Number(e.refuses)
                    }
                ]
            });
        }); 

        let regiao_sudeste = {
            name: 'Sudeste', 
            children: []
        }
        sudeste.forEach(e => {
            regiao_sudeste.children.push({
                name: e.state, 
                children: [
                    {
                        name: 'Casos', 
                        value: Number(e.cases)
                    }, {
                        name: 'Mortes', 
                        value: Number(e.deaths)
                    }, {
                        name: 'Recuperados', 
                        value: Number(e.refuses)
                    }
                ]
            });
        }); 

        let regiao_centro_oeste = {
            name: 'Centro-Oeste', 
            children: []
        }
        centro_oeste.forEach(e => {
            regiao_centro_oeste.children.push({
                name: e.state, 
                children: [
                    {
                        name: 'Casos', 
                        value: Number(e.cases)
                    }, {
                        name: 'Mortes', 
                        value: Number(e.deaths)
                    }, {
                        name: 'Recuperados', 
                        value: Number(e.refuses)
                    }
                ]
            });
        })

        let regiao_df = {
            name: 'Distrito Federal', 
            children: []
        }
        dist_federal.forEach(e => {
            regiao_df.children.push({
                name: e.state, 
                children: [
                    {
                        name: 'Casos', 
                        value: Number(e.cases)
                    }, {
                        name: 'Mortes', 
                        value: Number(e.deaths)
                    }, {
                        name: 'Recuperados', 
                        value: Number(e.refuses)
                    }
                ]
            });
        })

        networkSeries.data = [
            regiao_norte,
            regiao_nordeste, 
            regiao_sul, 
            regiao_sudeste, 
            regiao_centro_oeste, 
            regiao_df
        ];

        networkSeries.dataFields.linkWith = "linkWith";
        // networkSeries.dataFields.linkWith = "linkWith";
        networkSeries.dataFields.name = "name";
        // networkSeries.dataFields.name = "regiao";
        networkSeries.dataFields.id = "name";
        // networkSeries.dataFields.id = "name";
        networkSeries.dataFields.value = "value";
        // networkSeries.dataFields.value = "deaths";
        networkSeries.dataFields.children = "children";
        // networkSeries.dataFields.children = "state";
        
        networkSeries.nodes.template.tooltipText = "{name} ({value})";
        // networkSeries.nodes.template.tooltipText = "{name}";
        networkSeries.nodes.template.fillOpacity = 1;
        
        networkSeries.nodes.template.label.text = "{name}"
        // networkSeries.nodes.template.label.text = "{name}"
        networkSeries.fontSize = 14;
        networkSeries.maxLevels = 2;
        networkSeries.maxRadius = am4core.percent(8);
        networkSeries.manyBodyStrength = -15;
        networkSeries.nodes.template.label.hideOversized = true;
        networkSeries.nodes.template.label.truncate = true;
    
    }); // end am4core.ready()

}); 