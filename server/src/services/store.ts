import db from '../models/index';

export function createStore(
  manager: string,
  name: string,
  location: string,
  tags: string,
  phone: string,
  isPublic = false,
  headerImage = 'defaultHeader.jpg',
  icon = 'defaultIcon.jpg',
): Promise<any> {
  return db.models.Store.create({
    manager,
    name,
    location,
    public: isPublic,
    headerImage,
    icon,
    phone,
    tags,
  });
}

export function deleteStore(): any {}

export function getStoreWithComments(storeId: string): any {
  return db.models.Store.findByPk(storeId, {
    include: [
      {
        model: db.models.Review,
      },
    ],
  });
}
