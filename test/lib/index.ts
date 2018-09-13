#!/usr/bin/env node_modules/.bin/ts-node
// Shebang is required, and file *has* to be executable: chmod +x file.test.js
// See: https://github.com/tapjs/node-tap/issues/313#issuecomment-250067741
// tslint:disable:max-line-length
// tslint:disable:object-literal-key-quotes
import {test} from 'tap';
import * as fs from 'fs';
import * as _ from 'lodash';
import {buildDepTreeFromFiles} from '../../lib';

const load = (filename) => JSON.parse(
  fs.readFileSync(`${__dirname}/../fixtures/${filename}`, 'utf8'),
);

test('.Net simple project tree generated as expected', async (t) => {
  const includeDev = false;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-simple-project`,
    'packages.config',
    includeDev);
  const expectedTree = load('dotnet-simple-project/expected-tree.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});

test('.Net movie-hunter-api tree generated as expected', async (t) => {
  const includeDev = false;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-movie-hunter-api`,
    'packages.config',
    includeDev);
  const expectedTree = load('dotnet-movie-hunter-api/expected-tree.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});

test('.Net dotnet-no-packages empty tree generated as expected', async (t) => {
  const includeDev = false;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-no-packages`,
    'packages.config',
    includeDev);
  const expectedTree = load('dotnet-no-packages/expected-tree.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});

test('.Net dotnet-empty-manifest returns empty tree', async (t) => {
  const includeDev = false;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-empty-manifest`,
    'packages.config',
    includeDev);
  const expectedTree = load('dotnet-empty-manifest/expected-tree.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});

test('.Net dotnet-invalid-manifest throws', async (t) => {
  const includeDev = false;
  t.rejects(buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-invalid-manifest`,
    'packages.config',
    includeDev),
  );
});

test('.Net dotnet-simple-project-with-devDeps tree generated as expected', async (t) => {
  const includeDev = false;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-simple-project-with-devDeps`,
    'packages.config',
    includeDev);
  const expectedTree = load('dotnet-simple-project-with-devDeps/expected-tree-without-dev.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});

test('.Net dotnet-simple-project-with-devDeps tree generated as expected', async (t) => {
  const includeDev = true;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-simple-project-with-devDeps`,
    'packages.config',
    includeDev);
  const expectedTree = load('dotnet-simple-project-with-devDeps/expected-tree.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});

/*
****** csproj ******
*/

test('.Net .csproj simple project tree generated as expected', async (t) => {
  const includeDev = false;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-core-simple-project`,
    'simple-project.csproj',
    includeDev);
  const expectedTree = load('dotnet-core-simple-project/expected-tree.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});

test('.Net .csproj dotnet-no-packages empty tree generated as expected', async (t) => {
  const includeDev = false;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-no-packages`,
    'no-packages.csproj',
    includeDev);
  const expectedTree = load('dotnet-no-packages/expected-tree.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});

test('.Net .csproj dotnet-empty-manifest returns empty tree', async (t) => {
  const includeDev = false;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-empty-manifest`,
    'empty-manifest.csproj',
    includeDev);
  const expectedTree = load('dotnet-empty-manifest/expected-tree.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});

test('.Net .csproj core dotnet-invalid-manifest throws', async (t) => {
  const includeDev = false;
  t.rejects(buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-invalid-manifest`,
    'invalid.csproj',
    includeDev),
  );
});

test('.Net dotnet-simple-project-with-devDeps tree generated as expected', async (t) => {
  const includeDev = false;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-simple-project-with-devDeps`,
    'simple-project-with-dev.csproj',
    includeDev);
  const expectedTree = load('dotnet-simple-project-with-devDeps/expected-tree-from-csproj-without-dev.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});

test('.Net dotnet-simple-project-with-devDeps tree generated as expected', async (t) => {
  const includeDev = true;
  const tree = await buildDepTreeFromFiles(
    `${__dirname}/../fixtures/dotnet-simple-project-with-devDeps`,
    'simple-project-with-dev.csproj',
    includeDev);
  const expectedTree = load('dotnet-simple-project-with-devDeps/expected-tree-from-csproj.json');
  t.deepEqual(tree, expectedTree, 'trees are equal');
});