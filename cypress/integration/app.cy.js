describe("Users API E2E", () => {
  it("should create a user and return it in the list", () => {
    const user = {
      name: "Alice",
      email: "alice@example.com",
    };

    cy.request("POST", "/users", user).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("id");
      expect(res.body.name).to.eq(user.name);
      expect(res.body.email).to.eq(user.email);

      cy.request("GET", "/users").then((res2) => {
        expect(res2.status).to.eq(200);
        expect(res2.body).to.be.an("array");
        expect(res2.body.some((u) => u.email === user.email)).to.be.true;
      });
    });
  });

  it("should update a user", () => {
    const user = {
      name: "Bob",
      email: "bob@example.com",
    };

    cy.request("POST", "/users", user).then((res) => {
      const userId = res.body.id;

      cy.request("PUT", `/users/${userId}`, {
        name: "Bob Updated",
      }).then((res2) => {
        expect(res2.status).to.eq(200);
        expect(res2.body.name).to.eq("Bob Updated");
      });
    });
  });

  it("should delete a user", () => {
    const user = {
      name: "Charlie",
      email: "charlie@example.com",
    };

    cy.request("POST", "/users", user).then((res) => {
      const userId = res.body.id;

      cy.request("DELETE", `/users/${userId}`).then((res2) => {
        expect(res2.status).to.eq(200);
        expect(res2.body.id).to.eq(userId);
      });
    });
  });
});
