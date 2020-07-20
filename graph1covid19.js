/** Request to API COVID-19 for Brazilian States */

const obj = fetch("https://covid19-brazil-api.now.sh/api/report/v1", {
    "method": "GET"
})
.then(response => response.json())
.catch(err => err);

Promise.resolve(obj).then(response => {
    // A Promise resolvida está disponível aqui

    // console.log(response.data)
    
    let e = Array(response.data); 

    for(let i in e){
        e[0][i].deaths = Number(e[0][i].deaths); 
    }

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