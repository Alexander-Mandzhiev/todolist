CREATE Table IF NOT EXISTS int_fields (
    value SERIAL NOT NULL,
    task_field_id VARCHAR(255) NOT NULL,
    task_id VARCHAR(255) NOT NULL,
    CONSTRAINT int_fields_id PRIMARY KEY (task_field_id, task_id)
);

CREATE Table IF NOT EXISTS str_fields (
    value VARCHAR(255) NOT NULL,
    task_field_id VARCHAR(255) NOT NULL,
    task_id VARCHAR(255) NOT NULL,
    CONSTRAINT str_fields_id PRIMARY KEY (task_field_id, task_id)
);