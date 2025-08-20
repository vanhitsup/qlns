<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\SubAccount;

class SubAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subAccount = new SubAccount();
        $subAccount->name = 'Cash';
        $subAccount->accountId = 1;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Bank';
        $subAccount->accountId = 1;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Inventory';
        $subAccount->accountId = 1;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Accounts Receivable';
        $subAccount->accountId = 1;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Accounts Payable';
        $subAccount->accountId = 2;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Shareholder 1 Equity';
        $subAccount->accountId = 3;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Shareholder 1 Withdrawal';
        $subAccount->accountId = 4;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Sales';
        $subAccount->accountId = 5;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Cost of Sales';
        $subAccount->accountId = 6;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Salary';
        $subAccount->accountId = 6;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Rent';
        $subAccount->accountId = 6;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Utilities';
        $subAccount->accountId = 6;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Discount Earned';
        $subAccount->accountId = 5;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Discount Given';
        $subAccount->accountId = 6;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Tax';
        $subAccount->accountId = 2;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Salesman Payable';
        $subAccount->accountId = 2;
        $subAccount->save();

        $subAccount = new SubAccount();
        $subAccount->name = 'Damage Inventory';
        $subAccount->accountId = 1;
        $subAccount->save();

        //        $subAccount = new SubAccount();
        //        $subAccount->name = 'Cash on delivery';
        //        $subAccount->accountId = 1;
        //        $subAccount->save();
        //
        //        $subAccount = new SubAccount();
        //        $subAccount->name = 'Bkash';
        //        $subAccount->accountId = 1;
        //        $subAccount->save();
    }
}
