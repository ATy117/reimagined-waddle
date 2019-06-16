window.onload = function(){ 

    const data = JSON.parse(sessionStorage.getItem('data'));
    const species_sales = data.species_sales;
    const burger_sales = data.burger_sales;
    const burger_by_species = data.burger_by_species;
    const sales = data.sales;

    $('#something').click(function() {
        console.log(data);
    });

    $('#species-sales').click(function() {
        var properties = Object.keys(species_sales);
        var vals = Object.keys(species_sales).map(function(key) {
            return species_sales[key];
        });

        clearCanvas();


        var ctx = document.getElementById('myChart').getContext('2d');
        var chartData = {
            labels: properties,
            datasets: [{
                data: vals,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(123, 222, 10, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(123, 222, 10, 1)'
                ],
            }]
        };

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                title: {
                    display: true,
                    text: 'Sales by Species'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
    });

    $('#burger-sales').click(function() {
        var properties1 = Object.keys(burger_sales);
        var vals1 = Object.keys(burger_sales).map(function(key) {

            return burger_sales[key];
        });

        
        clearCanvas();

        var ctx = document.getElementById('myChart').getContext('2d');

        var chartData = {
            labels: properties1,
            datasets: [{
                data: vals1,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
            }]
        };

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                title: {
                    display: true,
                    text: 'Sales by Burger'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
    });

    $('#species-burger-sales').click(function() {
        var burger_properties= Object.keys(burger_by_species);
        var species_properties = Object.keys(burger_by_species[burger_properties[0]]);

        var vals = new Array(); 

        for (var i = 0; i < burger_properties.length; i++) {
            let cat = burger_by_species[burger_properties[i]];
            var data =  Object.keys(cat).map(function(key) {
                return cat[key];
            });

            vals.push(data);
        }
        
        clearCanvas();

        
		var barChartData = {
			labels: species_properties,
			datasets: [{
				label: burger_properties[0],
				backgroundColor: 'rgb(25, 27, 99)',
				data: vals[0]
			}, {
				label: burger_properties[1],
				backgroundColor: 'rgb(205, 17, 27)',
				data: vals[1]
			}, {
				label: burger_properties[2],
				backgroundColor: 'rgb(122, 217, 122)',
				data: vals[2]
			}]

        };
        
        
        var ctx = document.getElementById('myChart').getContext('2d');
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                title: {
                    display: true,
                    text: 'Sales by Burger per Species'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
            }
        });
    });

    $('#specific-species-sales').click(function() {
        var spec = document.getElementById('specific-date').value;
        if (spec){
            console.log(spec);
        } else {
            console.log("None");
            return;
        }

        var properties = Object.keys(species_sales);

        var exactVals = new Array();
        var check = new Object();

        for (var i = 0; i < properties.length; i++){
            var count = 0;

            Object.keys(sales).map(function(key) {
                var single = sales[key];

                if ((single.datetime).includes(spec) && (single.species).includes(properties[i])){
                    console.log(single.datetime + properties[i] );
                    count++;
                }
            });

            check[(properties[i])] = count;

            exactVals.push(count);
        }
        console.log(check);

        clearCanvas();


        var ctx = document.getElementById('myChart').getContext('2d');
        var chartData = {
            labels: properties,
            datasets: [{
                data: exactVals,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(123, 222, 10, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(123, 222, 10, 1)'
                ],
            }]
        };

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                title: {
                    display: true,
                    text: `Sales by Species for ${spec}`
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
        
    });
};

function clearCanvas(){
    $('#myChart').remove(); // this is my <canvas> element
    $('body').append('<canvas id="myChart" width="400" height="400"></canvas>');
};

