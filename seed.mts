import { createSeedClient } from "@snaplet/seed";

console.log('🍂 seeding initializing');

const seed = await createSeedClient({
  dryRun: false,
});

console.log('⚠️ clearing database');
await seed.$resetDatabase();

const myAddress = "0x59266D85D94666D037C1e32dAa8FaC9E95CdaFEf".toLowerCase();
const sepoliaChainId = 11155111;
const optimismChainId = 10;

console.log('🍃 seeding users');
await seed.public_users([
  {
    address: myAddress.toLowerCase(),
  },
]);

console.log('🍃 seeding boards');
await seed.hyperboards([
  {
    admin_id: myAddress,
    name: "Sepolia board 1",
    tile_border_color: "black",
    background_image: "test.png",
    chain_id: sepoliaChainId,
    hyperboard_registries: () => [
      {
        label: "Sepolia registry 1",
        registries: () => ({
          name: "Test registry",
          chain_id: sepoliaChainId,
          admin_id: myAddress,
          claims: () => [
            {
              admin_id: myAddress,
              display_size: 1,
              hypercert_id:
                "11155111-0xa16dfb32eb140a6f3f2ac68f41dad8c7e83c4941-119439110789249400675644487208550642221056",
              owner_id: myAddress,
              chain_id: sepoliaChainId,
            },
            {
              admin_id: myAddress,
              display_size: 2,
              hypercert_id:
                "11155111-0xa16dfb32eb140a6f3f2ac68f41dad8c7e83c4941-1020847100762815390390123822295304634368",
              owner_id: myAddress,
              chain_id: sepoliaChainId,
            }
          ],
        }),
      },
    ],
  },
  {
    admin_id: myAddress,
    name: "Optimism board 1",
    tile_border_color: "black",
    background_image: "test.png",
    chain_id: optimismChainId,
    hyperboard_registries: () => [
      {
        label: "Optimism registry 1",
        registries: () => ({
          name: "Test registry",
          chain_id: optimismChainId,
          claims: () => [
            {
              admin_id: myAddress,
              display_size: 1,
              hypercert_id:
                "10-0x822f17a9a5eecfd66dbaff7946a8071c265d1d07-14549453162438565882303508089960113417224192",
              owner_id: myAddress,
              chain_id: sepoliaChainId,
            },
          ],
        }),
      },
    ],
  }
]);

console.log('🌱 seeding default sponsor metadata');
await seed.default_sponsor_metadata([
  {

    address: myAddress,
    firstName: "Testy",
    lastName: "McTestface",
    image: "test.png",
    type: 'company',
    companyName: 'Testy McTestface Inc',
  },
]);

console.log('✅ seeding complete');