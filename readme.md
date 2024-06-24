# Split Image For Width Large Content

We unusually watch large width content. It is too large that we could not recognize the whole thing in single viewport.
So i thought slicing image generator can fix this issue.

* This is lightweight program as well as its feature So don't trust the output *

## envrionment

- node 18v only

## Capture large width content at Chrome

![image](https://github.com/sggnology/split_large_size_image/assets/100742377/4aec1d9f-5dc9-44ba-830f-8936d51d7523)

- Go to developer mode
- control responsive mode size
- We can see `setting icon` at right top side position 
- click `Run Command` menu
- search `capture`
- click `capture full size screenshot`

## How to use

1. clone this repository
2. put your large width content into `source_in` directory
3. naming your image to `image.png`
4. typing index.js > main method argument that represent `separate page count(int)`
5. typing at command `npm start`

## Result

- source splitted by `separate page count`
- we can see the results at `resource_out` directory

## Significant

### Your output width is over 2000px

- I cannot figure out the correct issue. but when we split image over 2000px it miss some part of image.
