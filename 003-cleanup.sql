--
-- delete websites that have only been searched once so far
--
DELETE FROM websites
WHERE search_times <= 1
RETURNING *;
--
-- trim url to only contain origin
--
UPDATE websites
SET url = substring(url, 'https*://[\w+\-*\.+]{2,}')
RETURNING *;
--
-- update template image urls
--
UPDATE templates
SET image_url = CONCAT(
        'https://raw.githubusercontent.com/hustlelikeaboss/static-files/master/img/sqsp-demo-screenshots/',
        template_name,
        '.png'
    )
RETURNING *;
--
-- create family for orphaned templates
--
INSERT INTO template_families (
        template_family_name,
        template_family_id
    ) (
        select t.template_name as template_family_name,
            t.template_family_id as template_family_id
        from templates t
            left join template_families f on f.template_family_id = t.template_family_id
        where f.template_family_id is null
    );