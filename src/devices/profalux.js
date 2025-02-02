const fz = require('../converters/fromZigbee');
const tz = require('../converters/toZigbee');
const exposes = require('../lib/exposes');
const reporting = require('../lib/reporting');
const e = exposes.presets;
const ea = exposes.access;

module.exports = [
    {
        fingerprint: [{manufId: 4368, endpoints: [{ID: 1, profileID: 260, deviceID: 513, inputClusters: [0, 3, 21],
            outputClusters: [3, 4, 5, 6, 8, 256, 64544, 64545]}]}],
        model: 'NB102',
        vendor: 'Profalux',
        description: 'Cover remote',
        fromZigbee: [],
        toZigbee: [],
        exposes: [],
    },
    {
        zigbeeModel: [
            'MOT-C1Z06C\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000',
            'MOT-C1Z10F\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000',
            'MOT-C1Z06F\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000',
        ],
        fingerprint: [{manufId: 4368, endpoints: [{ID: 1, profileID: 260, deviceID: 512,
            inputClusters: [0, 3, 4, 5, 6, 8, 10, 21, 256, 64544, 64545], outputClusters: [3, 64544]}]}],
        model: 'NSAV061',
        vendor: 'Profalux',
        description: 'Cover',
        fromZigbee: [fz.command_cover_close, fz.command_cover_open, fz.command_cover_stop, fz.cover_position_tilt],
        toZigbee: [tz.cover_state, tz.cover_position_tilt],
        exposes: [e.cover_position().setAccess('state', ea.ALL)],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(2);
            await reporting.bind(endpoint, coordinatorEndpoint, ['closuresWindowCovering']);
            await reporting.currentPositionLiftPercentage(endpoint);
        },
	endpoint: (device) => {
		return { default: 2};
	},
    },
    {
        zigbeeModel: ['MAI-ZTP20F', 'MAI-ZTP20C'],
        model: 'MAI-ZTP20F',
        vendor: 'Profalux',
        description: 'Cover remote',
        fromZigbee: [],
        toZigbee: [],
        exposes: [],
    },
];
