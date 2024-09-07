"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var categories;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.category.createMany({
                        data: [
                            { name: 'Websites', icon: 'internet' },
                            { name: 'AI Stuff', icon: 'ai' },
                            { name: 'Quant', icon: 'research' },
                            { name: 'Blockchain', icon: 'blockchain' },
                            { name: 'Collabs', icon: 'collaborate' },
                            { name: 'Miscellaneous', icon: 'everything' },
                        ],
                    })];
                case 1:
                    categories = _a.sent();
                    console.log('Categories seeding completed!');
                    // Seed data for Website projects
                    return [4 /*yield*/, prisma.website.create({
                            data: {
                                name: 'E-commerce Admin',
                                images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
                                techs: [
                                    { name: 'React', description: 'Frontend framework' },
                                    { name: 'Node.js', description: 'Backend runtime' },
                                ],
                                liveLink: 'https://ecommerce.com',
                                githubLink: 'https://github.com/ecommerce-admin',
                                hooks: {
                                    create: [
                                        {
                                            title: 'Admin Dashboard',
                                            description: 'Manages users, products, and orders.',
                                        },
                                    ],
                                },
                            },
                        })];
                case 2:
                    // Seed data for Website projects
                    _a.sent();
                    // Seed data for AI projects
                    return [4 /*yield*/, prisma.aI.create({
                            data: {
                                name: 'ML Trading Bot',
                                images: ['bot1.jpg', 'bot2.jpg'],
                                techs: [
                                    { name: 'Python', description: 'Programming language' },
                                    { name: 'TensorFlow', description: 'Machine learning framework' },
                                ],
                                liveLink: 'https://mltradingbot.com',
                                githubLink: 'https://github.com/ml-trading-bot',
                                hooks: {
                                    create: [
                                        {
                                            title: 'Trading Algorithm',
                                            description: 'Automates stock trading based on ML predictions.',
                                        },
                                    ],
                                },
                            },
                        })];
                case 3:
                    // Seed data for AI projects
                    _a.sent();
                    // Seed data for Quant projects
                    return [4 /*yield*/, prisma.quant.create({
                            data: {
                                name: 'Multitype Orderbook',
                                images: ['orderbook1.jpg'],
                                techs: [
                                    { name: 'C++', description: 'High-performance language' },
                                    { name: 'SQL', description: 'Database query language' },
                                ],
                                liveLink: 'https://multitypeorderbook.com',
                                githubLink: 'https://github.com/multitype-orderbook',
                                hooks: {
                                    create: [
                                        {
                                            title: 'Order Matching Engine',
                                            description: 'Matches buy and sell orders in real time.',
                                        },
                                    ],
                                },
                            },
                        })];
                case 4:
                    // Seed data for Quant projects
                    _a.sent();
                    // Seed data for Blockchain projects
                    return [4 /*yield*/, prisma.blockChain.create({
                            data: {
                                name: 'DCEX',
                                images: ['dcex1.jpg'],
                                techs: [
                                    { name: 'Solidity', description: 'Smart contract programming' },
                                    { name: 'Ethereum', description: 'Blockchain platform' },
                                ],
                                liveLink: 'https://dcex.com',
                                githubLink: 'https://github.com/dcex',
                                hooks: {
                                    create: [
                                        {
                                            title: 'Decentralized Exchange',
                                            description: 'Facilitates token trades using smart contracts.',
                                        },
                                    ],
                                },
                            },
                        })];
                case 5:
                    // Seed data for Blockchain projects
                    _a.sent();
                    // Seed data for Collab projects
                    return [4 /*yield*/, prisma.collab.create({
                            data: {
                                name: 'FuzzyLogic',
                                images: ['fuzzy1.jpg'],
                                techs: [
                                    { name: 'Python', description: 'Programming language' },
                                    { name: 'Matplotlib', description: 'Data visualization library' },
                                ],
                                liveLink: 'https://fuzzylogic.com',
                                githubLink: 'https://github.com/fuzzylogic',
                                hooks: {
                                    create: [
                                        {
                                            title: 'Fuzzy Logic Engine',
                                            description: 'Implements a fuzzy inference system.',
                                        },
                                    ],
                                },
                            },
                        })];
                case 6:
                    // Seed data for Collab projects
                    _a.sent();
                    // Seed data for Miscellaneous projects
                    return [4 /*yield*/, prisma.miscellaneous.create({
                            data: {
                                name: 'Fractals',
                                images: ['fractals1.jpg'],
                                techs: [
                                    { name: 'JavaScript', description: 'Scripting language for graphics' },
                                    { name: 'Canvas API', description: 'Graphics rendering API' },
                                ],
                                liveLink: 'https://fractals.com',
                                githubLink: 'https://github.com/fractals',
                                hooks: {
                                    create: [
                                        {
                                            title: 'Fractal Generation',
                                            description: 'Generates complex fractal patterns.',
                                        },
                                    ],
                                },
                            },
                        })];
                case 7:
                    // Seed data for Miscellaneous projects
                    _a.sent();
                    console.log('Seeding completed!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
