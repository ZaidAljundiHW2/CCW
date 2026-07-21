CREATE DATABASE CaptainsCrabDatabase

CREATE TABLE generaldetails (

    generaldetailsid SERIAL PRIMARY KEY,
    label varchar(255),
    val varchar(255),
    type varchar(255)

);

INSERT INTO generaldetails (label, val, type) VALUES (
    'Instagram',
    'https://www.instagram.com/captainscrab',
    'Social Media'
);

INSERT INTO generaldetails (label, val, type) VALUES (
    'Facebook',
    'https://www.facebook.com/captainscrab',
    'Social Media'
);

INSERT INTO generaldetails (label, val, type) VALUES (
    'TikTok',
    'https://www.tiktok.com/@captainscrab',
    'Social Media'
);




INSERT INTO generaldetails (label, val, type) VALUES (
    'Phone Number',
    '647 271 3140',
    'Footer'
);

INSERT INTO generaldetails (label, val, type) VALUES (
    'Address',
    '1250 Brant Street, Burlington, ON LS7 1X6',
    'Footer'
);

INSERT INTO generaldetails (label, val, type) VALUES (
    'Location',
    'Undefined',
    'Footer'
);

INSERT INTO generaldetails (label, val, type) VALUES (
    'Email',
    'captainscrab@gmail.com',
    'Footer'
);

INSERT INTO generaldetails (label, val, type) VALUES (
    'Timings',
    'Mon - Sun: 11:00 AM - 10:00 PM',
    'Footer'
);





INSERT INTO menucategories (category, displayorder) VALUES ('Build Your Own', (SELECT MAX(displayorder) + 1 FROM menucategories));

INSERT INTO MenuCategories (
    Category, 
    DisplayOrder 
) VALUES (
    'Drinks',
    5
);

INSERT INTO menu (itemname, hasdesc, itemdescription, foodimage, itemtype, price)
VALUES ('Lemonade', FALSE, '', 'https://drive.google.com/file/d/1HQhyRLHd4_bpRndZl3cfKfdkKiLhCCpG/view?usp=sharing', 'Drinks', '3.49');

INSERT INTO menu (itemname, hasdesc, itemdescription, foodimage, itemtype, price)
VALUES ('Strawberry Mojito', FALSE, '', 'https://drive.google.com/file/d/1o_kJ3R1yONLOeQb7eXvJXvlcEBloDYU-/view?usp=sharing', 'Drinks', '5.99');

INSERT INTO menu (itemname, hasdesc, itemdescription, foodimage, itemtype, price)
VALUES ('Water', FALSE, '', 'https://drive.google.com/file/d/1COlouG6W2KAbEeJ1eZ6FWjO9I7VNJBI8/view?usp=sharing', 'Drinks', '1.99');

INSERT INTO menu (itemname, hasdesc, itemdescription, foodimage, itemtype, price)
VALUES ('Coca Cola', FALSE, '', 'https://drive.google.com/file/d/1wMU-8EaozpQ4YWDI77B6eje2bVkxI2pb/view?usp=sharing', 'Drinks', '2.99');

INSERT INTO menu (itemname, hasdesc, itemdescription, foodimage, itemtype, price)
VALUES ('Pepsi', FALSE, '', 'https://drive.google.com/file/d/1PH8Xj9QlOL8v5ud4ykcWLg_k5IBO9WfP/view?usp=sharing', 'Drinks', '2.99');

INSERT INTO menu (itemname, hasdesc, itemdescription, foodimage, itemtype, price)
VALUES ('Fanta', FALSE, '', 'https://drive.google.com/file/d/10ep_vhNTPuo5kDmxtTi6szOdqEtZPjkK/view?usp=sharing', 'Drinks', '2.99');

INSERT INTO menu (itemname, hasdesc, itemdescription, foodimage, itemtype, price)
VALUES ('Sprite', FALSE, '', 'https://drive.google.com/file/d/1ORQHEZNLT4Vh7EQaRqO7wK9gn1iHaV0R/view?usp=sharing', 'Drinks', '2.99');

INSERT INTO menu (itemname, hasdesc, itemdescription, foodimage, itemtype, price)
VALUES ('Orange Juice', FALSE, '', 'https://drive.google.com/file/d/1paZ-IehYLdtKEseGvfez-8Baw-HYPFVD/view?usp=sharing', 'Drinks', '2.99');
