# homebridge-ui-vladilen4ik

Minimal Homebridge platform plugin for testing UI configuration and debug logs.

The Homebridge UI exposes an accessory name, a debug message, and an enabled toggle. On startup and every switch change, the plugin writes the configured message at Homebridge's debug level.

## Development

```sh
npm install
npm test
```

To see the messages, enable debug logging in Homebridge.
