"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// original before customization
// module.exports = createCoreController('api::post.post');
module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  // custom actions
  async customAction(ctx) {
    try {
      ctx.body = "ok";
    } catch (error) {
      ctx.body = error;
    }
  },
  // override existing
  async find(ctx) {
    ctx.query = { ...ctx.query, local: "en" };
    const { data, meta } = await super.find(ctx);
    meta.date = Date.now();

    return { data, meta };
  },
  // override with our own function
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const entity = await strapi.service("api::post.post").findOne(id, query);
    const sanitiezedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitiezedEntity);
  },
}));
