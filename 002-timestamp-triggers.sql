--
-- function to update timestamp if table row changed
--
CREATE OR REPLACE FUNCTION update_timestamp() RETURNS trigger AS $body$ BEGIN IF row(NEW.*) IS DISTINCT
FROM row(OLD.*) THEN NEW.last_updated_at = now();
RETURN NEW;
ELSE RETURN OLD;
END IF;
END;
$body$ LANGUAGE plpgsql;
--
-- create and apply triggers
--
-- websites
DROP TRIGGER IF EXISTS search_updated ON websites;
CREATE TRIGGER search_updated BEFORE
UPDATE ON websites FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
-- templates
DROP TRIGGER IF EXISTS template_updated ON templates;
CREATE TRIGGER template_updated BEFORE
UPDATE ON templates FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
-- template_families
DROP TRIGGER IF EXISTS template_family_updated ON template_families;
CREATE TRIGGER template_family_updated BEFORE
UPDATE ON template_families FOR EACH ROW EXECUTE PROCEDURE update_timestamp();