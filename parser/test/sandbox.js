import * as cheerio from "cheerio";
import { v4 } from 'uuid'

const api = {}

const load = function (resource) {
    const $ = cheerio.load(resource)
    api.getElementsByClassName = function (className) {
        return $('.' + className)
    }
    api.getElementById = function (id) {
        return $('#' + id)
    }
    api.children = function (node) {
        return $(node).children()
    }
    api.wrapElement = function (element) {
        return $(element)
    }
    api.addClass = function (node, name) {
        node.addClass(name)
    }
    api.hasClass = function (node, name) {
        return node.hasClass(name)
    }
    api.text = function (node) {
        return node.text()
    }
    api.getAttr = function (node, name) {
        return node.attr(name)
    }
    api.setAttr = function (node, name, value) {
        return node.attr(name, value)
    }
    api.append = function (node, html) {
        node.append(html)
    }
    api.empty = function (node) {
        node.empty()
    }
}

const uuid = function () {
    return v4
}

export {
    load,
    uuid
}