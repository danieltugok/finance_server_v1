import { PrismaClient } from '@prisma/client';
import * as widgets from './data/widgets.json';

const prisma = new PrismaClient();
async function main() {
  console.log('Start seeding ...');

  const categoryChart = await prisma.widgetCategory.create({
    data: {
      name: 'Chart',
      icon: 'Chart widgets',
    },
  });

  await prisma.widget.createMany({
    data: widgets.map((w) => ({
      ...w,
      widget_category_id: categoryChart.id,
    })),
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
