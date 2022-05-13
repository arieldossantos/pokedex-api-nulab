const request = require("supertest");
const { app, obterTodosPokemon, obterPokemon } = require("./index");

describe('caminho "/pokemon"', () => {
    test('deve retornar 6 pokemon com altura', done => {
        request(app)
          .get("/pokemon")
          .then(response => {
            expect(response.body.length).toBe(6);
            for(var i = 0; i < 6; i++) {
                expect(response.body[i].height).toBeGreaterThanOrEqual(1)
            }
            expect(response.status).toEqual(200);
            done();
          });
      }); 
})

describe('obtencao de pokemon', () => {
    test('obterTodosPokemon deve retornar 6 pokemons em qualquer ordem', () => {
        return obterTodosPokemon().then(data => {
            expect(data.length).toBe(6);
        });
    })

    test('ao obter bulbasaur deve retornar um pokemon tipo grama', () => {
        const BULBASAUR = 'bulbasaur'
        return obterPokemon(BULBASAUR).then(data => {
            expect(data.types[0].type.name).toBe('grass');
        });
    })
})