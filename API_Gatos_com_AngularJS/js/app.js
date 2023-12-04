// Criação de um módulo Angular chamado 'minhaAplicacao'
var app = angular.module('minhaAplicacao', []);

// Criação de um controller chamado 'meuController' que utiliza o serviço $scope e $http
app.controller('meuController', function ($scope, $http) {
    // Array para armazenar as raças de gatos obtidas da API
    $scope.racas = [];

    // Variável para armazenar a raça selecionada pelo usuário
    $scope.selectedRaca = '';

    // Objeto para armazenar a URL da imagem da raça selecionada
    $scope.selectedImage = {};

    // Função para carregar a lista de raças de gatos da API
    $scope.carregaRacas = function () {
        $http.get('https://api.thecatapi.com/v1/breeds/')
            .then(function (response) {
                // Atribui a lista de raças ao array $scope.racas
                $scope.racas = response.data;
            })
            .catch(function (error) {
                // Exibe um erro no console se houver problemas ao carregar raças
                console.error('Erro ao carregar raças de gato.', error);
            });
    };

    // Observa mudanças na variável $scope.selectedRaca
    $scope.$watch('selectedRaca', function (racaSelecionada, racaPassada) {
        // Verifica se a raça selecionada mudou e, se sim, chama a função para carregar a imagem
        if (racaSelecionada !== racaPassada) {
            $scope.carregaImagem(racaSelecionada);
        }
    });

    // Função para carregar a imagem da raça selecionada
    $scope.carregaImagem = function (racaId) {
        // Verifica se a raçaId é válida antes de fazer a solicitação à API
        if (racaId) {
            $http.get(`https://api.thecatapi.com/v1/images/search?raca_ids=${racaId}&limit=1`)
                .then(function (response) {
                    // Verifica se a resposta contém pelo menos uma imagem
                    if (response.data.length > 0) {
                        // Atribui a URL da imagem ao objeto $scope.selectedImage
                        $scope.selectedImage.url = response.data[0].url;
                    } else {
                        // Se não houver imagens, define a URL da imagem como vazia
                        $scope.selectedImage.url = '';
                    }
                })
                .catch(function (error) {
                    // Exibe um erro no console se houver problemas ao carregar a imagem
                    console.error('Erro ao carregar imagem de gato.', error);
                });
        }
    };

    // Chama a função para carregar as raças ao iniciar o controller
    $scope.carregaRacas();
});