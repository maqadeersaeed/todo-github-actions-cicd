-- ===============================================
-- USERS SAMPLE DATA
-- email:
-- password: 123456
-- ===============================================

INSERT INTO users (id, name, email, password, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'John Doe', 'test@gmail.com',
   '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.Q3o5P90Lk5iZ0ZtNsLTi51hpYz6FQie', NOW()),

  ('22222222-2222-2222-2222-222222222222', 'Sarah Smith', 'user@gmail.com',
   '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.Q3o5P90Lk5iZ0ZtNsLTi51hpYz6FQie', NOW());


-- ===============================================
-- TASKS FOR USER 1 (John Doe)
-- ===============================================

INSERT INTO tasks (id, title, completed, created_at, user_id)
VALUES
  (gen_random_uuid(), 'Buy groceries', false, NOW(), '11111111-1111-1111-1111-111111111111'),
  (gen_random_uuid(), 'Finish Angular TODO app', true, NOW(), '11111111-1111-1111-1111-111111111111'),
  (gen_random_uuid(), 'Prepare project report', false, NOW(), '11111111-1111-1111-1111-111111111111'),
  (gen_random_uuid(), 'Walk the dog', true, NOW(), '11111111-1111-1111-1111-111111111111');


-- ===============================================
-- TASKS FOR USER 2 (Sarah Smith)
-- ===============================================

INSERT INTO tasks (id, title, completed, created_at, user_id)
VALUES
  (gen_random_uuid(), 'Car wash', false, NOW(), '22222222-2222-2222-2222-222222222222'),
  (gen_random_uuid(), 'Pay electricity bill', true, NOW(), '22222222-2222-2222-2222-222222222222'),
  (gen_random_uuid(), 'Morning workout', false, NOW(), '22222222-2222-2222-2222-222222222222'),
  (gen_random_uuid(), 'Read 20 pages of a book', true, NOW(), '22222222-2222-2222-2222-222222222222');
