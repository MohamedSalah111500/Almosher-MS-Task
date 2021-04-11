import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category, Product } from '../core/models/models';
import { GetXhrService } from '../core/services/GetXHR/get-xhr.service';
import { CartService } from '../shared/services/cart.service';
import { Subscriber, Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  allItems: Product[] = [
    {
      id: 645,
      category_id: 50,
      name: 'مكرونة الحمص 400جرام',
      name_ar: 'مكرونة الحمص 400جرام',
      name_en: 'مكرونة الحمص 400جرام',
      description: 'مكرونة الحمص 400جرام',
      size: '',
      tax: 0,
      price: 28,
      image_dir: '/img/Products/2020/12/20/',
      image:
        'https://healthyandtasty.net/healthyProject/public/img/Categories/2020/12/23/Categories_7382_1608677821.jpg',
      available: 0,
      image_name: 'Products_4030_1608484032.jpg',
      branch_id: 0,
    },
    {
      id: 646,
      category_id: 50,
      name: 'مكرونة العدس 400جرام',
      name_ar: 'مكرونة العدس 400جرام',
      name_en: 'مكرونة العدس 400جرام',
      description: 'مكرونة العدس 400جرام',
      size: '',
      tax: 0,
      price: 28,
      image_dir: '/img/Products/2020/12/20/',
      image:
        'https://healthyandtasty.net/healthyProject/public/img/Categories/2020/12/23/Categories_7382_1608677821.jpg',
      available: 0,
      image_name: 'Products_710_1608483968.jpg',
      branch_id: 0,
    },
    {
      id: 647,
      category_id: 50,
      name: 'مكرونة السبانخ 400جرام',
      name_ar: 'مكرونة السبانخ 400جرام',
      name_en: 'مكرونة السبانخ 400جرام',
      description: 'مكرونة السبانخ 400جرام',
      size: '',
      tax: 0,
      price: 28,
      image_dir: '/img/Products/2020/12/20/',
      image:
        'https://healthyandtasty.net/healthyProject/public/img/Categories/2020/12/23/Categories_7382_1608677821.jpg',
      available: 0,
      image_name: 'Products_2366_1608484078.jpg',
      branch_id: 0,
    },
    {
      id: 647,
      category_id: 50,
      name: 'مكرونة السبانخ 400جرام',
      name_ar: 'مكرونة السبانخ 400جرام',
      name_en: 'مكرونة السبانخ 400جرام',
      description: 'مكرونة السبانخ 400جرام',
      size: '',
      tax: 0,
      price: 28,
      image_dir: '/img/Products/2020/12/20/',
      image:
        'https://healthyandtasty.net/healthyProject/public/img/Categories/2020/12/23/Categories_7382_1608677821.jpg',
      available: 0,
      image_name: 'Products_2366_1608484078.jpg',
      branch_id: 0,
    },
    {
      id: 647,
      category_id: 50,
      name: 'مكرونة السبانخ 400جرام',
      name_ar: 'مكرونة السبانخ 400جرام',
      name_en: 'مكرونة السبانخ 400جرام',
      description: 'مكرونة السبانخ 400جرام',
      size: '',
      tax: 0,
      price: 28,
      image_dir: '/img/Products/2020/12/20/',
      image:
        'https://healthyandtasty.net/healthyProject/public/img/Categories/2020/12/23/Categories_7382_1608677821.jpg',
      available: 0,
      image_name: 'Products_2366_1608484078.jpg',
      branch_id: 0,
    },
  ];
  activeCategoryId: number;
  allCategory: Category[] = [];
  activeProducts: Product[] = [];
  totalCount;
  url: string =
    'get_all_categories?token=ay5t9Xh4hmAXSUEBby9j9dSAxjNCtnrFKp6x9YqG43JaXbpHESvHsP9G4vCg&start=0&limit=10';
  itemsLenth;
  categoresSliderConfig = {
    centeredSlides: false,
    slidesPerView: 3.5,
    spaceBetween: 10,
    grabCursor: true,
    breakpointsInverse: true,
    breakpoints: {
      992: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  };

  Subscription = new Subscription();
  constructor(
    private xhrService: GetXhrService,
    private _cartsService: CartService,
    public loadingController: LoadingController
  ) {
    this.Subscription.add((this.itemsLenth = this._cartsService.cartItemCount));
    this.totalCount = this._cartsService.totalCount;
  }

  ngOnInit(): void {
    this.getAllCategoryFromApi();
  }

  //get All Category From Api
  getAllCategoryFromApi() {
    this.Subscription.add(
      this.xhrService.getData(this.url).subscribe((res) => {
        this.allCategory = res.result as Category[];
        this.activeProducts = this.allCategory[1].products;
        this.activeCategoryId = this.allCategory[0].id;
        this.presentItemsFromCats(this.activeCategoryId);
      })
    );
  }

  //add active class to selected category
  selectCategory = (id) => {
    this.activeCategoryId = id;
    this.presentItemsFromCats(id);
  };
  //set active Products to DOM
  setActiveProducts = (product: Product[]) => {
    this.activeProducts = product;
  };

  //add active class to selected category
  presentItemsFromCats = (id) => {
    const selectedCat = this.allCategory.find((cat) => cat.id == id);
    this.setActiveProducts(selectedCat.products);
  };

  changeCount(e) {
    switch (e.type) {
      case 'decrease':
        this.decrease(e.item);
        break;
      case 'increase':
        this.increase(e.item);
        break;
    }
  }

  decrease(item) {
    this._cartsService.removeProduct(item);
    // item.count == 0 ? this._cartsService.removeProduct(item) : null;
  }
  increase(item) {
    this._cartsService.addProduct(item);
  }

  // unsubscribe all observables to  be garbage collectable for high performance ,no memory leaks
  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }
}
