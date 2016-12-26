
const TOTAL_DIGITS = 12;
const CENT_DIGITS = 2;

exports.up = (knex) => {
  return knex.schema
    .createTable('invoice', (table) => {
      table.increments('id').primary();
      table.dateTime('purchaseTime');
      table.dateTime('deleted_at');
      table.string('locationName').notNullable();
      table.string('terminalId').notNullable();
      table.string('purchaseMethod');
      table.decimal('purchasePrice', TOTAL_DIGITS, CENT_DIGITS);
      table.decimal('taxCollected', TOTAL_DIGITS, CENT_DIGITS);
      table.decimal('subtotal', TOTAL_DIGITS, CENT_DIGITS);
      table.decimal('cashGiven', TOTAL_DIGITS, CENT_DIGITS);
      table.boolean('isVoided').defaultTo(false);
      table.boolean('isReturned').defaultTo(false);
      table.boolean('isOnHold').defaultTo(false);
      table.timestamps();
    })
    .createTable('invoicepromo', (table) => {
      table.increments('id').primary();
      table.integer('invoiceId').unsigned().references('invoice.id');
      table.integer('promoId').unsigned().references('promo.id');
      table.decimal('cost', TOTAL_DIGITS, CENT_DIGITS);
      table.jsonb('promoData');
      table.timestamps();
    })
    .createTable('invoiceitem', (table) => {
      table.increments('id').primary();
      table.integer('invoiceId').unsigned().references('invoice.id');
      table.integer('stockitemId').unsigned().references('stockitem.id');
      table.integer('quantity').unsigned();
      table.decimal('cost', TOTAL_DIGITS, CENT_DIGITS);
      table.boolean('taxable');
      table.jsonb('stockitemData');
      table.timestamps();
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('invoice')
    .dropTable('invoicepromo')
    .dropTable('invoiceitem');
};
