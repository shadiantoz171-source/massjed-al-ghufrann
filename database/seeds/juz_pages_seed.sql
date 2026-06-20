-- Seed Juz Pages (Pages 1..581 mapped to Juz 1..29)
-- Pages 1..581 are treated page-by-page across the first 29 Juz.
-- Juz 30 (جزء عم) is handled at the surah level and is NOT included here.

-- This file inserts rows into juz_pages where:
--   page_number ranges from 1 to 581
--   juz_number = floor((page_number-1)/20) + 1, capped at 29

BEGIN;

