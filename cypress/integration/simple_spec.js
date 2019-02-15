const correo = "a.acostag@uniandes.edu.co", password = "12345678";
const nombres = 'Armando', apellidos = 'Acosta Guerrero', error = 'Ocurrió un error activando tu cuenta'
const url = 'https://losestudiantes.co', docente = 'Mario Linares';


describe('Login los estudiantes', function() {
    it('Visita los estudiantes y realiza el login correctamente', function() {
      cy.visit(url)
      cy.contains('Cerrar').click({ force: true })
      cy.contains('Ingresar').click()
      cy.get('.cajaLogIn').find('input[name="correo"]').click().type(correo);
      cy.get('.cajaLogIn').find('input[name="password"]').click().type(password);
      cy.get('.cajaLogIn').contains('Ingresar').click();
      cy.get('.navbar').find('div.dropDown', 'button').click();
      cy.get('.navbar').contains('Salir').click()
    });
});


describe('Registro Los estudiantes (Usuario Existente)', function() {
    it('Visita los estudiantes y falla creando un usuario con email existente', function() {
      cy.visit(url);
      cy.contains('Cerrar').click();
      cy.contains('Ingresar').click();
      cy.get('.cajaSignUp').find('input[name="nombre"]').click().type(nombres);
      cy.get('.cajaSignUp').find('input[name="apellido"]').click().type(apellidos);
      cy.get('.cajaSignUp').find('input[name="correo"]').click().type(correo);
      cy.get('.cajaSignUp').find('select[name="idUniversidad"]').select('universidad-de-los-andes');
      cy.get('.cajaSignUp').find('select[name="idPrograma"]').select('22');
      cy.get('.cajaSignUp').find('input[name="password"]').click().type(password);
      cy.get('.cajaSignUp').find('input[name="acepta"]').click();
      cy.get('.cajaSignUp').contains('Registrarse').click();
      cy.contains(error);
    });
});

describe('Búsqueda Docente Los estudiantes', function() {
    it('Busca un docente en los estudiantes y muestra el perfil', function() {
      cy.visit(url)
      cy.contains('Cerrar').click()
      cy.get('div.Select-control').find('span.Select-arrow','input').click();
      cy.get('span.Select-multi-value-wrapper').find('div.Select-placeholder').click();
      cy.get('span.Select-multi-value-wrapper').find('input').click({ force: true }).type(docente, { force: true });
      cy.get('div.Select-option-group').find('div.Select-option.is-focused').click()
    })
});


describe('Consulta de un Docente en Los estudiantes', function () {
    it('Visita los estudiantes y busca los docentes de una maestría y retorna un perfil', function () {
        cy.visit(url)
        cy.contains('Cerrar').click()
        cy.contains('Ingresar').click()
        cy.get('.cajaLogIn').find('input[name="correo"]').click().type(correo)
        cy.get('.cajaLogIn').find('input[name="password"]').click().type(password)
        cy.get('.cajaLogIn').contains('Ingresar').click()
        cy.get('.opcion_maestria_click').click()
        cy.get('.form-control').select("universidad-de-los-andes,maestria,maestrIa-en-ingenierIa-de-software")

        cy.get('.profesores').find('.profesor a').then(function ($select) {
            $select.map((i, el) => {
                if (Cypress.$(el).attr('href') == 'universidad-de-los-andes/diseno/profesores/miguel-navarro-sanint') {
                    cy.visit($select[i].href)
                }
            })
        });
        
    })
})

describe('Consulta de un Docente en Los estudiantes', function () {
    it('Visita los estudiantes y busca los docentes de una maestría y retorna un perfil con un filtro por materia', function () {
        cy.visit(url)
        cy.contains('Cerrar').click()
        cy.contains('Ingresar').click()
        cy.get('.cajaLogIn').find('input[name="correo"]').click().type(correo)
        cy.get('.cajaLogIn').find('input[name="password"]').click().type(password)
        cy.get('.cajaLogIn').contains('Ingresar').click()
        cy.get('.opcion_maestria_click').click()
        cy.get('.form-control').select("universidad-de-los-andes,maestria,maestrIa-en-ingenierIa-de-software")

        cy.get('.profesores').find('.profesor a').then(function ($select) {
            $select.map((i, el) => {
                if (Cypress.$(el).attr('href') == 'universidad-de-los-andes/diseno/profesores/miguel-navarro-sanint') {
                    cy.visit($select[i].href)
                }
            })
        });

        cy.get('.materias').find('[name="id:MISO4205"]').check({ force: true })
        
    })
})

