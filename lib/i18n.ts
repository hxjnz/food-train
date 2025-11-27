// Internationalization support
export type Locale = 'zh' | 'en';

export const translations = {
  zh: {
    // Header
    appTitle: '🚂 食堂列车',
    appSubtitle: '今天中午吃什么？',
    randomPick: '🎲 随机选择',
    addRestaurant: '添加餐厅',
    login: '登录',
    signup: '注册',
    logout: '退出登录',
    viewAsGuest: '访客浏览',
    
    // Restaurant List
    noRestaurants: '还没有餐厅，快来添加第一家吧！',
    viewDetails: '查看详情',
    edit: '编辑',
    delete: '删除',
    
    // Filter
    filterTitle: '筛选',
    apply: '应用',
    clear: '清除',
    cuisinePlaceholder: '菜系类型（如：川菜）',
    priceRange: '价格范围',
    allPrices: '全部价格',
    cheap: '便宜',
    medium: '中等',
    expensive: '较贵',
    distancePlaceholder: '距离（如：步行5分钟）',
    
    // Random Picker
    randomTitle: '🎲 今天吃什么？',
    noMatchingRestaurants: '没有找到符合条件的餐厅',
    back: '返回',
    startPicking: '开始抽取',
    picking: '抽取中...',
    pickAgain: '再抽一次',
    totalRestaurants: '共有 {count} 家餐厅可供选择',
    
    // Auth
    loginTitle: '登录',
    loginDescription: '输入您的邮箱和密码登录',
    signupTitle: '注册',
    signupDescription: '创建您的账号，开始推荐餐厅',
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    username: '用户名',
    usernameOptional: '用户名（可选）',
    loggingIn: '登录中...',
    signingUp: '注册中...',
    noAccount: '还没有账号？',
    hasAccount: '已有账号？',
    registerNow: '立即注册',
    loginNow: '立即登录',
    
    // Restaurant Form
    addNewRestaurant: '添加新餐厅',
    editRestaurant: '编辑餐厅',
    restaurantName: '餐厅名称',
    restaurantNamePlaceholder: '例如：老王面馆',
    cuisineType: '菜系类型',
    cuisineTypePlaceholder: '例如：川菜',
    priceRangeLabel: '价格范围',
    distance: '距离',
    distanceLabelPlaceholder: '例如：步行5分钟',
    address: '地址',
    addressPlaceholder: '例如：北京路123号',
    notes: '备注',
    notesPlaceholder: '例如：招牌菜是红烧肉，周末人很多',
    photo: '餐厅照片',
    saving: '处理中...',
    save: '保存修改',
    cancel: '取消',
    add: '添加餐厅',
    
    // Restaurant Detail
    createdAt: '添加时间',
    confirmDelete: '确定要删除这家餐厅吗？此操作无法撤销。',
    deleteFailed: '删除失败，请重试',
    
    // Guest Banner
    guestBanner: '您正在以访客身份浏览',
    guestMessage: '登录后可以添加和管理餐厅',
    loginToAdd: '登录以添加餐厅',
  },
  en: {
    // Header
    appTitle: '🚂 Food Train',
    appSubtitle: 'What\'s for lunch today?',
    randomPick: '🎲 Random Pick',
    addRestaurant: 'Add Restaurant',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    viewAsGuest: 'View as Guest',
    
    // Restaurant List
    noRestaurants: 'No restaurants yet. Be the first to add one!',
    viewDetails: 'View Details',
    edit: 'Edit',
    delete: 'Delete',
    
    // Filter
    filterTitle: 'Filter',
    apply: 'Apply',
    clear: 'Clear',
    cuisinePlaceholder: 'Cuisine Type (e.g., Chinese)',
    priceRange: 'Price Range',
    allPrices: 'All Prices',
    cheap: 'Cheap',
    medium: 'Medium',
    expensive: 'Expensive',
    distancePlaceholder: 'Distance (e.g., 5 min walk)',
    
    // Random Picker
    randomTitle: '🎲 What\'s for Lunch?',
    noMatchingRestaurants: 'No matching restaurants found',
    back: 'Back',
    startPicking: 'Start Picking',
    picking: 'Picking...',
    pickAgain: 'Pick Again',
    totalRestaurants: '{count} restaurants available',
    
    // Auth
    loginTitle: 'Login',
    loginDescription: 'Enter your email and password to login',
    signupTitle: 'Sign Up',
    signupDescription: 'Create your account to start recommending',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    username: 'Username',
    usernameOptional: 'Username (optional)',
    loggingIn: 'Logging in...',
    signingUp: 'Signing up...',
    noAccount: 'Don\'t have an account?',
    hasAccount: 'Already have an account?',
    registerNow: 'Sign up now',
    loginNow: 'Login now',
    
    // Restaurant Form
    addNewRestaurant: 'Add New Restaurant',
    editRestaurant: 'Edit Restaurant',
    restaurantName: 'Restaurant Name',
    restaurantNamePlaceholder: 'e.g., Joe\'s Noodles',
    cuisineType: 'Cuisine Type',
    cuisineTypePlaceholder: 'e.g., Chinese',
    priceRangeLabel: 'Price Range',
    distance: 'Distance',
    distanceLabelPlaceholder: 'e.g., 5 min walk',
    address: 'Address',
    addressPlaceholder: 'e.g., 123 Main St',
    notes: 'Notes',
    notesPlaceholder: 'e.g., Great beef noodles, busy on weekends',
    photo: 'Restaurant Photo',
    saving: 'Processing...',
    save: 'Save Changes',
    cancel: 'Cancel',
    add: 'Add Restaurant',
    
    // Restaurant Detail
    createdAt: 'Added on',
    confirmDelete: 'Are you sure you want to delete this restaurant? This action cannot be undone.',
    deleteFailed: 'Delete failed, please try again',
    
    // Guest Banner
    guestBanner: 'You are viewing as a guest',
    guestMessage: 'Login to add and manage restaurants',
    loginToAdd: 'Login to add restaurants',
  },
};

export function t(key: string, locale: Locale = 'zh', params?: Record<string, any>): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Replace parameters
  if (params) {
    Object.keys(params).forEach(paramKey => {
      value = value.replace(`{${paramKey}}`, params[paramKey]);
    });
  }
  
  return value;
}

