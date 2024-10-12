# Modbus Server Product Requirements Document (PRD)

## 1. Product Overview

### Product Name:

Modbus Server with MQTT, AWS IoT, Simulated Unit, and Context Management Integration

### Purpose:

The Modbus Server is designed to facilitate communication between Modbus-compatible devices, MQTT-based systems, AWS IoT, and simulated units. It orchestrates communication between these components, managing context for devices, reading and writing to registers, and enabling bidirectional data flow between devices and the cloud.

## 2. Features

### 2.1. Holding Registers

- The Modbus Server must be capable of **reading and writing to holding registers**.
- Changes in holding register values should trigger specific actions based on predefined conditions. Examples:
  - **Site State/Mode** (start/stop/reset/manual/auto)
  - **Site/Unit Commands** such as Curtailment and PQ commands. Values in holding registers should be scaled appropriately before action.

### 2.2. MQTT Data to Input Registers

- The Modbus Server should **write streaming MQTT data to input registers** based on predefined key names in the streaming JSON data.
  - Each key in the JSON corresponds to a specific Modbus register, with mappings defined in the config.
  - The server must support **dynamic mappings** for sites and devices based on site or device-specific MQTT topics.

### 2.3. AWS IoT Integration

- **AWS IoT Communication:** The server will connect to AWS IoT using SSL certificates and securely communicate with cloud topics.
- **Cloud Commands:** Cloud commands such as `enable_cloud_data` will allow the server to send data to AWS IoT for a specified period (e.g., 5 minutes).
- **Dynamic Cloud Communication:** Cloud communication is controlled via commands and will enable or disable data transfer to AWS IoT dynamically.

### 2.4. Simulated Unit Integration

- **Simulated Units:** The server supports integration with simulated units, allowing calculation of average, sum, min, max, and custom metrics for simulated devices.
- **Data Calculations:** Simulated units will perform periodic calculations and update Modbus registers based on the device's reported data.
- **Data Expiration:** Simulated unit data will expire after 30 seconds and be recalculated if needed.

### 2.5. Context Management Integration

- **Device Context Handling:** The server will manage the context for devices, including setting and tracking device IDs, states, and operational status.
- **Unit Context Handling:** The server will track unit states in context and use that information to control device behavior dynamically.
- **Context Processing:** Context is updated dynamically based on MQTT messages, allowing the system to respond to changes in real-time.

### 2.6. Orchestration and Initialization

- **Modbus Server Initialization:** The server will initialize Modbus servers, TCP clients, or Modbus aggregators based on the configuration. The system will handle data processing, register reads/writes, and caching as defined in the config.
- **Data Caching:** Cached holding registers will be loaded on startup, and new register values will be cached at regular intervals.
- **Periodic Data Processing:** The server will periodically write Modbus data, manage the watchdog, and send heartbeats (HB) to local brokers.

### 2.7. Data Transfer Between Devices

- The Modbus Server should support **data transfer between Modbus devices**. It will:
  - Read input registers from one device and write those values into the input registers of another device, effectively passing data through the server.
  - Implement periodic reading of registers and forwarding data to the destination devices.

## 3. Functional Requirements

### 3.1. Register Handling

- **Input Registers:** Input register mappings will be predefined, and data received from MQTT streams will be written to these registers.
- **Holding Registers:** Holding registers will store device state and control information. Specific registers must trigger appropriate MQTT commands to manage connected devices.
- **Scaling and Type Handling:** Registers can handle multiple types (e.g., i16, u16, i32, u32, f32) and must apply scaling based on their configuration. Conversion utilities will ensure that register values are written and read correctly.

### 3.2. MQTT Integration

- **Streaming Data Handling:** Data received via MQTT topics will be written to the appropriate registers based on predefined mappings.
  - The MQTT broker settings include SSL certificates and port configuration for secure communication.
- **Command Dispatching:** The server must support sending commands over MQTT to external systems, such as starting/stopping units based on register values.

### 3.3. AWS IoT Integration

- **AWS IoT Cloud Data:** The server will send and receive data from AWS IoT topics using SSL certificates. Communication is established using the AWS IoT device SDK.
- **Cloud Commands:** Cloud commands will enable dynamic data transfer, allowing the server to send data to the cloud for a specific time duration.
- **Cloud Communication Management:** The server will handle secure cloud connections and automatically manage reconnects when needed.

### 3.4. Simulated Units

- **Data Calculations:** The server will calculate average, sum, min, max, and custom metrics for simulated units. These calculations will be updated periodically and can be used to drive other functionality.
- **Data Expiration:** Simulated unit data will expire after 30 seconds, ensuring the server only processes active data.
- **Unit-Specific Calculations:** Each simulated unit will have its own set of calculations based on its configured topics and variables.

### 3.5. Context Management

- **Device and Unit Context:** The server will track and maintain context for each device and unit, including device IDs, states, and operational status.
- **Context Handlers:** Handlers will be registered for managing context dynamically based on incoming MQTT messages, allowing real-time updates to context-driven device behavior.

### 3.6. Orchestration and Caching

- **Modbus Server Orchestration:** The server will initialize Modbus servers or clients and manage their lifecycle.
- **Caching:** Cached holding registers will be loaded at startup, and periodic caching will be enabled based on the configuration.

### 3.7. Data Aggregation and Transfer

- **Data Aggregation:** Aggregate data from multiple devices by reading input registers and storing it in the server's memory.
- **Data Transfer Between Devices:** Regularly transfer data between Modbus devices by reading from a client and writing the data to another client.

## 4. Configuration

### 4.1. Modbus Server

- **Port:** The server will run on port 1502 (TCP); configurable.
- **Register Capacity:**
  - Maximum number of input registers: configurable.
  - Maximum number of holding registers: 100 (configurable).
- **Cache Management:** Cached holding registers are stored locally, with configurable cache intervals and folder paths. Cached values are automatically written back to registers on server startup.

### 4.2. MQTT Configuration

- **Broker Settings:** The MQTT broker must support local and cloud-based topics. Local topics are defined in the configuration, and SSL certificates are used to connect securely to the MQTT broker.
- **Topic Mappings:** Topics for reading and writing will follow the `local/site` and `local/device` prefixes with corresponding register mappings.

### 4.3. AWS IoT Configuration

- **SSL Certificates:** The AWS IoT connection will be secured using device-specific certificates stored in the `certs` directory.
- **Cloud Communication Control:** The server will dynamically enable or disable communication with AWS IoT based on cloud commands.

### 4.4. Simulated Unit Configuration

- **Topics and Variables:** Simulated units will have configurable topics and variables (e.g., avg, sum, min, max) for monitoring and reporting data.
- **Metrics Calculations:** The system will calculate metrics based on the unit's data and update registers accordingly.

### 4.5. Context Management Configuration

- **Device and Unit States:** The server will track device and unit states in context, updating dynamically based on incoming messages.
- **Context Handlers:** Handlers for processing and managing context dynamically will be initialized on server startup.

### 4.6. Orchestration Configuration

- **Server Types:** The system can run as a Modbus server, TCP client, or Modbus aggregator, with behavior defined by the configuration.

### 4.7. Data Mappings

- **Site-Level Data:** Registers will store site-wide information such as power, frequency, and state.
- **Device-Level Data:** Registers will store device-specific information such as temperature, voltage, and power.

## 5. Logging and Monitoring

- **Log Configuration:** The server will log errors and critical information using a rotating file system with a maximum size of 20 MB and up to 10 files. Data logs can be compressed and retained for configurable days.
- **Watchdog Monitoring:** The server will monitor data activity and reset states based on watchdog timers.

## 6. Non-Functional Requirements

### 6.1. Performance

- The system must handle **high-frequency data streams** from MQTT, AWS IoT, and simulated units (multiple updates per second) and process them efficiently into Modbus registers.

### 6.2. Scalability

- The system must support **multiple devices and units**, with dynamic configuration of registers based on the number of units and their offsets.

## 7. Timeline and Milestones

1. **Phase 1:** Basic Modbus register handling and MQTT integration.
2. **Phase 2:** Full support for data transfer between devices, AWS IoT, simulated units, context management, and orchestration.
3. **Phase 3:** Performance optimization and scalability testing.

## 8. Appendix

- ## **References:**
