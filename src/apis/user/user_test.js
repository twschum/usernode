
/**
 * @jest-environment node
 */
jest.setTimeout(60000);
global.console = {
    log: jest.fn(),
    error: jest.fn()
}

const axios = require('axios');
const {to} = require('await-to-js');


describe("User API test", async () => {
    const app = require('../../../app');
    const service = axios.create({
        auth: {
          username: global.conf.authentication.admin.username,
          password: global.conf.authentication.admin.password
        }
      });
    const path = "http://localhost:"+ global.conf.listenPort +"/api/v1.0/user";
    let user_id = "";
    throw new Error("Not implemented entity model");
    // const user = {
    //     name: "john doe",
    //     email: "john.doe@email.com",
    //     age: 34
    // };
    
    afterAll(async done => {
        app.express_server.close();
        done();
    });

    test("POST /user", async done => {
        const [err, result] = await to(service.post(path, user));   
        
        expect(err).toBeNull();
        expect(result.status).toBe(200);
        expect(result.data.status).toBe("created");
        expect(result.data.entity).toBe("user");
        expect(result.data.id).not.toBeNull();
        user_id = result.data.id;
        done();
    });


    test("GET /user:id", async done => {        
        const [err, result] = await to(service.get(`${ path }/${user_id}`));        
        expect(err).toBeNull();
        expect(result.status).toBe(200);
        expect(result.data).not.toBeNull();
        expect(result.data.id).toBe(user_id)
        throw new Error("Not implemented read fields");
        done();
    });

    test("PUT /user:id", async done => {
        throw new Error("Not implemented update fields");        
        // user.name = "jane doe";
        // user.email = "jane.doe@email.com";
        // user.age = 32;
        

        const [err, result] = await to(service.put(`${path}/${user_id}`, user));   
        expect(err).toBeNull();
        expect(result.status).toBe(200);
        expect(result.data).not.toBeNull();
        expect(result.data.entity).toBe("user");
        expect(result.data.id).toBe(user_id);
        expect(result.data.status).toBe("updated");
        done();
    });

    test("DELETE /user:id", async done => {
        const [err, result] = await to(service.delete(`${path}/${user_id}`));
        expect(err).toBeNull();
        expect(result.status).toBe(200);
        expect(result.data).not.toBeNull();
        expect(result.data.entity).toBe("user");
        expect(result.data.id).toBe(user_id);
        expect(result.data.status).toBe("deleted");
        done();
    });
});
