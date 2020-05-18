/**
 * @description jest server
 * @author sswq
 */

 const request = require('supertest')

 const server = require('../src/app').callback()

 module.exports = request(server)