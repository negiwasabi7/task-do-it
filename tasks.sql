CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    title VARCHAR(128),
    content TEXT
);

ALTER TABLE tasks ADD COLUMN deadline TIMESTAMP WITH TIME ZONE NOT NULL;
ALTER TABLE tasks DROP COLUMN deadline;
ALTER TABLE tasks ADD COLUMN deadline DATE DEFAULT NULL;
ALTER TABLE tasks ADD COLUMN todo_count INTEGER DEFAULT 0;
ALTER TABLE tasks ADD COLUMN done_count INTEGER DEFAULT 0;

CREATE VIEW task_summary_view 
AS
select
	tasks.id,
    tasks.user_id,
    tasks.title,
    tasks.deadline,
    COUNT(todos.id) AS todo_count,
    SUM(CASE WHEN todos.done THEN 1 ELSE 0 END) AS done_count
FROM
    tasks
LEFT JOIN
    todos ON tasks.id = todos.task_id
GROUP BY
    tasks.user_id, tasks.id;




INSERT INTO tasks (user_id, title, content) VALUES
('9bfd957f-ebd8-48b9-85c9-ee9bd00539a0', 'Title 1', 'Content 1'),
('9bfd957f-ebd8-48b9-85c9-ee9bd00539a0', 'Title 2', 'Content 2'),
('9bfd957f-ebd8-48b9-85c9-ee9bd00539a0', 'Title 3', 'Content 3'),
('9bfd957f-ebd8-48b9-85c9-ee9bd00539a0', 'Title 4', 'Content 4'),
('9bfd957f-ebd8-48b9-85c9-ee9bd00539a0', 'Title 5', 'Content 5'),
('9bfd957f-ebd8-48b9-85c9-ee9bd00539a0', 'Title 6', 'Content 6'),
('9bfd957f-ebd8-48b9-85c9-ee9bd00539a0', 'Title 7', 'Content 7'),
('9bfd957f-ebd8-48b9-85c9-ee9bd00539a0', 'Title 8', 'Content 8'),
('9bfd957f-ebd8-48b9-85c9-ee9bd00539a0', 'Title 9', 'Content 9'),
('9bfd957f-ebd8-48b9-85c9-ee9bd00539a0', 'Title 10', 'Content 10');