CREATE TABLE IF NOT EXISTS parking_slots (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  slot_code VARCHAR(32) NOT NULL UNIQUE,
  zone VARCHAR(32) NOT NULL DEFAULT 'A',
  status ENUM('free', 'occupied', 'reserved', 'offline') NOT NULL DEFAULT 'free',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicle_events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  plate_number VARCHAR(32) NULL,
  vehicle_type VARCHAR(32) NULL,
  event_type ENUM('entry', 'exit') NOT NULL,
  confidence DECIMAL(5,4) NULL,
  occurred_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_vehicle_events_occurred_at (occurred_at),
  INDEX idx_vehicle_events_plate (plate_number)
);

CREATE TABLE IF NOT EXISTS parking_predictions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  predicted_for DATETIME NOT NULL,
  predicted_vehicle_count INT NOT NULL,
  model_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_prediction_time (predicted_for)
);

INSERT IGNORE INTO parking_slots (slot_code, zone, status)
VALUES
('A-01','A','occupied'),('A-02','A','free'),('A-03','A','free'),
('A-04','A','occupied'),('A-05','A','free'),('A-06','A','reserved'),
('A-07','A','free'),('A-08','A','occupied'),('A-09','A','free'),
('A-10','A','free'),('A-11','A','occupied'),('A-12','A','free');
