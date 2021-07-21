import * as cheerio from "cheerio";
import { v4 } from 'uuid'

const load = function (resource) {
    const $ = cheerio.load(resource)
    return getApi($)
}

const getApi = function ($, node) {
    const api = {}
    api.getElementsByClassName = function (className) {
        const apis = []
        $('.' + className).each((index, element) => {
            apis.push(getApi($, $(element)))
        })
        return apis
    }
    api.getElementById = function (id) {
        const apis = []
        $('#' + id).each((index, element) => {
            apis.push(getApi($, $(element)))
        })
        return apis;
    }
    api.children = function () {
        const apis = []
        node.children().each((index, element) => {
            apis.push(getApi($, $(element)))
        })
        return apis
    }
    api.addClass = function (name) {
        node.addClass(name)
    }
    api.hasClass = function (name) {
        return node.hasClass(name)
    }
    api.text = function () {
        return node.text()
    }
    api.getAttr = function (name) {
        return node.attr(name)
    }
    api.setAttr = function (name, value) {
        return node.attr(name, value)
    }
    api.append = function (html) {
        node.append(html)
    }
    api.empty = function () {
        node.empty()
    }
    api.appendByTag = function (tag, content) {
        $(tag).append(content)
    }
    api.html = function () {
        console.log($.html())
    }
    return api;
}

const uuid = function () {
    return v4
}

export {
    load,
    uuid
}